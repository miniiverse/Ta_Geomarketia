"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentHeader } from "./components/PaymentHeader";
import { PaymentTabs } from "./components/PaymentTabs";
import { CreditCardTab } from "./components/CreditCardTab";
import { BankTransferTab } from "./components/BankTransferTab";
import { EWalletTab } from "./components/EWalletTab";
import { QrisTab } from "./components/QrisTab";
import { OrderSummary } from "./components/OrderSummary";

export type TabType = "credit-card" | "bank-transfer" | "e-wallet" | "qris";

const tax = 10000;
const formatRp = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<TabType>("credit-card");
  const searchParams = useSearchParams();

  const title       = searchParams.get("title")       ?? "Geospatial Analysis Package";
  const priceStr    = searchParams.get("price")        ?? "Rp 550.000";
  const category    = searchParams.get("category")    ?? "Retail";
  const region      = searchParams.get("region")      ?? "Jakarta";
  const description = searchParams.get("description") ?? "";

  const subtotal = parsePrice(priceStr);
  const total    = subtotal + tax;

  return (
    <main style={{
      minHeight: "100vh",
      background: "#F3F4F6",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <PaymentHeader />
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "12px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "#EBF3FF", border: "1px solid #BFDBFE",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8", fontWeight: 500 }}>Product purchased</p>
            <p style={{ margin: 0, fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 700, color: "#0f172a" }}>{title}</p>
            {description && (
              <p style={{ margin: "2px 0 0", fontSize: "14px", color: "#64748b", fontWeight: 400, maxWidth: "100%" }}>
                {description}
              </p>
            )}
          </div>
        </div>

        <div
          className="payment-divider"
          style={{ height: "32px", width: "1px", background: "#E5E7EB" }}
        />

        <span style={{
          fontSize: "12px", fontWeight: 700, color: "#1A56DB",
          background: "#EBF3FF", border: "1px solid #BFDBFE",
          padding: "3px 10px", borderRadius: "6px",
          textTransform: "uppercase", letterSpacing: "0.06em",
        }}>
          {category}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <path d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z" />
            <circle cx="12" cy="11" r="2" fill="#64748b" />
          </svg>
          <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>{region}</span>
        </div>

        <div
          className="payment-total"
          style={{ marginLeft: "auto", width: "100%" }}
        >
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>Total Payment: </span>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#1A56DB" }}>{formatRp(total)}</span>
        </div>
      </div>

      <div
        className="payment-grid"
        style={{
          width: "100%", padding: "1.25rem 2rem", boxSizing: "border-box",
          display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px",
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

        <OrderSummary
          subtotal={subtotal}
          tax={tax}
          total={total}
          formatRp={formatRp}
          title={title}
          category={category}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ── Tablet: 768px ── */
        @media (max-width: 768px) {
          .payment-grid {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
          }
          .tab-label {
            display: none;
          }
          .payment-divider {
            display: none;
          }
          .payment-total {
            margin-left: 0 !important;
          }
        }

        /* ── Mobile: 640px ── */
        @media (max-width: 640px) {
          .payment-grid {
            padding: 0.75rem !important;
            gap: 0.75rem !important;
          }
        }

        /* ── Mobile XS: 400px ── */
        @media (max-width: 400px) {
          .payment-grid {
            padding: 0.5rem !important;
            gap: 0.5rem !important;
          }
        }

        /* ── Mobile 360px (Android mid-range) ── */
        @media (max-width: 360px) {
          .payment-grid {
            padding: 0.4rem !important;
            gap: 0.4rem !important;
          }
        }
      `}</style>
    </main>
  );
}