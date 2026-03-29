"use client";

import { useState } from "react";
import { CartItemType, CartItem } from "./components/CartItem"; 
import { CartHeader } from "./components/CartHeader";
import { OrderSummary } from "./components/OrderSummary";

const TAX = 10000;

const INITIAL_ITEMS: CartItemType[] = [
  {
    id: 1,
    name: "Retail Site Selection Analysis",
    description: "Analyze potential retail locations based on geospatial data.",
    price: 250000,
    quantity: 1,
    image: "retail",
  },
  {
    id: 2,
    name: "Market Potential Mapping",
    description: "Identify areas of high market potential using maps.",
    price: 300000,
    quantity: 1,
    image: "market",
  },
];

const formatRp = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>(INITIAL_ITEMS);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + TAX;

  return (
    <main style={{ minHeight: "calc(100vh - 66px - 420px)", background: "#F3F4F6", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <CartHeader />

      <div
        className="cart-grid"
        style={{
          width: "100%", padding: "1.5rem 2rem", boxSizing: "border-box",
          display: "grid", gridTemplateColumns: "1fr 320px",
          gap: "1.25rem", alignItems: "start",
        }}
      >
        <CartItem items={items} formatRp={formatRp} onUpdateQty={updateQty} onRemove={removeItem} /> {/* ✅ CartItem bukan CartItems */}
        <OrderSummary subtotal={subtotal} tax={TAX} total={total} formatRp={formatRp} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; padding: 1rem !important; }
        }
      `}</style>
    </main>
  );
}