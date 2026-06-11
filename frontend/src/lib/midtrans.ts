// lib/midtrans.ts
// Utility untuk load Snap.js Midtrans ke browser secara dynamic
// Dipanggil sekali saja, kalau sudah ada tidak akan load ulang

declare global {
  interface Window {
    snap: {
      pay: (
        snapToken: string,
        options: {
          onSuccess?: (result: MidtransResult) => void;
          onPending?: (result: MidtransResult) => void;
          onError?: (result: MidtransResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

export interface MidtransResult {
  order_id: string;
  transaction_id: string;
  transaction_status: string;
  payment_type: string;
  gross_amount: string;
  fraud_status?: string;
  finish_redirect_url?: string;
}

/**
 * Load Snap.js dari CDN Midtrans.
 * Aman dipanggil berkali-kali, tidak akan inject script duplikat.
 */
export function loadMidtransSnap(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Kalau sudah ada, langsung resolve
    if (window.snap) {
      resolve();
      return;
    }

    // Kalau script sudah di-inject tapi belum selesai load
    const existing = document.getElementById("midtrans-snap");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Gagal load Midtrans Snap.js")));
      return;
    }

    // Inject script baru
    const script = document.createElement("script");
    script.id = "midtrans-snap";
    script.src = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL!;
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
    );
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Gagal load Midtrans Snap.js. Cek koneksi atau Client Key."));

    document.head.appendChild(script);
  });
}