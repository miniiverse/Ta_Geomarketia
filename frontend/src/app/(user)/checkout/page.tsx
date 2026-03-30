"use client";

import { useState } from "react";
import { PaymentHeader } from "./components/PaymentHeader";
import { PaymentTabs } from "./components/PaymentTabs";
import { CreditCardTab } from "./components/CreditCardTab";
import { BankTransferTab } from "./components/BankTransferTab";
import { EWalletTab } from "./components/EWalletTab";
import { QrisTab } from "./components/QrisTab";
import { OrderSummary } from "./components/OrderSummary";

export type TabType = "credit-card" | "bank-transfer" | "e-wallet" | "qris";

const subtotal = 550000;
const tax = 10000;
const total = subtotal + tax;
const formatRp = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<TabType>("credit-card");

  return (
    <main style={{
      minHeight: "calc(100vh - 66px)",
      background: "#F3F4F6",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <PaymentHeader />

      <div
        className="payment-grid"
        style={{
          width: "100%", padding: "1.5rem 2rem", boxSizing: "border-box",
          display: "grid", gridTemplateColumns: "1fr 300px",
          gap: "1.25rem", alignItems: "start",
        }}
      >
        <div style={{
          background: "#fff", borderRadius: 16,
          border: "1px solid #E5E7EB",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}>
          <PaymentTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div style={{ padding: "1.5rem" }}>
            {activeTab === "credit-card"   && <CreditCardTab />}
            {activeTab === "bank-transfer" && <BankTransferTab />}
            {activeTab === "e-wallet"      && <EWalletTab />}
            {activeTab === "qris"          && <QrisTab />}
          </div>
        </div>

        <OrderSummary subtotal={subtotal} tax={tax} total={total} formatRp={formatRp} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @media (max-width: 768px) {
          .payment-grid { grid-template-columns: 1fr !important; padding: 1rem !important; }
          .tab-label { display: none; }
        }
      `}</style>
    </main>
  );
}