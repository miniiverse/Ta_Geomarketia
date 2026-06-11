"use client";

import { useEffect, useState } from "react";

export interface PaymentData {
  payment_id: number;
  order_id: number;
  midtrans_transaction_id: string | null;
  payment_method: string | null;
  payment_status: string | null;
  gross_amount: number | null;
  payment_time: string | null;
}

export interface OrderData {
  order_id: number;
  user_id: number;
  project_id: number;
  order_status: string;
  total_amount: string;
  created_at: string;
  payment: PaymentData | null;
}

export function useOrders() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data.orders ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
}