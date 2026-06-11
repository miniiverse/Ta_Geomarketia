// hooks/usePayment.ts
"use client";

import { useState, useCallback } from "react";
import { loadMidtransSnap, MidtransResult } from "../../lib/midtrans";
import { createSnapToken, CreateSnapTokenPayload } from "../../lib/api";
import { useRouter } from "next/navigation";

export type PaymentStatus = "idle" | "loading" | "success" | "error";

export interface UsePaymentReturn {
  status: PaymentStatus;
  errorMessage: string | null;
  pay: (payload: CreateSnapTokenPayload) => Promise<void>;
}

async function createOrder(projectId: number, totalAmount: number): Promise<number> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_id: projectId, total_amount: totalAmount }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Gagal membuat order.');
  return data.order_id;
}

export function usePayment(): UsePaymentReturn {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const pay = useCallback(async (payload: CreateSnapTokenPayload) => {
    setStatus("loading");
    setErrorMessage(null);

    let orderId = payload.order_id;

    try {
      // 1. Buat order dulu kalau belum ada
      if (!orderId) {
        orderId = await createOrder(payload.project_id, payload.total_amount);
      }

      // 2. Load Snap.js
      await loadMidtransSnap();

      // 3. Minta Snap Token
      const { snap_token } = await createSnapToken({ ...payload, order_id: orderId });

      setStatus("idle");

      // 4. Tampilkan popup Midtrans
      window.snap.pay(snap_token, {
        onSuccess: (result: MidtransResult) => {
          // Pembayaran berhasil → redirect ke invoice
          console.log("✅ Pembayaran berhasil:", result);
          setStatus("success");
          router.push(
            `/transactions/${orderId}?title=${encodeURIComponent(payload.title ?? "")}`
          );
        },

        onPending: (_result: MidtransResult) => {
          // Midtrans trigger ini saat menunggu pembayaran bank transfer
          // TIDAK redirect — biarkan user tetap di halaman checkout
          // User bisa bayar lagi atau cancel manual
          console.log("⏳ Menunggu pembayaran...");
          setStatus("idle");
        },

        onError: (result: MidtransResult) => {
          console.error("❌ Pembayaran gagal:", result);
          setStatus("error");
          setErrorMessage("Pembayaran gagal. Silakan coba lagi.");
        },

        onClose: () => {
          // User tutup popup (klik X) — tetap di halaman checkout
          // Order sudah masuk database dengan status pending
          // User bisa klik Checkout lagi untuk bayar order yang sama
          console.log("ℹ️ Popup ditutup");
          setStatus("idle");
        },
      });
    } catch (err) {
      console.error("❌ Error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi."
      );
    }
  }, [router]);

  return { status, errorMessage, pay };
}