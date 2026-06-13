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


export function loadMidtransSnap(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }

    const existing = document.getElementById("midtrans-snap");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Gagal load Midtrans Snap.js")));
      return;
    }

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