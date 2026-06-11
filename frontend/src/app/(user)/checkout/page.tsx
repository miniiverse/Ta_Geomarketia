"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { UserInfoCard } from "./components/UserInfoCard";
import { ProjectInfoCard } from "./components/ProjectInfoCard";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentHeader } from "./components/PaymentHeader";
import { usePayment } from "../../hooks/usePayment";

const tax = 10000;
const formatRp = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title       = searchParams.get("title")       ?? "Geospatial Analysis Package";
  const priceStr    = searchParams.get("price")        ?? "Rp 550.000";
  const category    = searchParams.get("category")    ?? "Retail";
  const region      = searchParams.get("region")      ?? "Jakarta";
  const description = searchParams.get("description") ?? "";
  const orderId     = Number(searchParams.get("order_id")   ?? "0");
  const projectId   = Number(searchParams.get("project_id") ?? "0");

  const subtotal = parsePrice(priceStr);
  const total    = subtotal + tax;

  const { status, errorMessage, pay } = usePayment();
  const isLoading = status === "loading";

  const handleCheckout = () => {
    pay({
      order_id:     orderId,
      project_id:   projectId,
      total_amount: total,
      title,
    });
  };

  const handleCancel = () => {
    router.push("/projects-list");
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#F3F4F6",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <PaymentHeader />

      {errorMessage && (
        <div style={{
          margin: "1rem 2rem 0", padding: "12px 16px", borderRadius: 10,
          background: "#FEF2F2", border: "1px solid #FECACA",
          display: "flex", alignItems: "center", gap: 10,
          color: "#DC2626", fontSize: "0.85rem", fontWeight: 600,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#DC2626" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="white" />
          </svg>
          {errorMessage}
        </div>
      )}

      <div className="payment-grid" style={{
        width: "100%", padding: "1.25rem 2rem", boxSizing: "border-box",
        display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px",
        gap: "1.25rem", alignItems: "start",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <ProjectInfoCard
            title={title}
            category={category}
            region={region}
            description={description}
            price={priceStr}
            formatRp={formatRp}
            subtotal={subtotal}
          />
          <UserInfoCard />
        </div>

        <OrderSummary
          subtotal={subtotal}
          tax={tax}
          total={total}
          formatRp={formatRp}
          title={title}
          category={category}
          onCheckout={handleCheckout}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @media (max-width: 768px) {
          .payment-grid { grid-template-columns: 1fr !important; padding: 1rem !important; }
        }
        @media (max-width: 640px) { .payment-grid { padding: 0.75rem !important; gap: 0.75rem !important; } }
        @media (max-width: 400px) { .payment-grid { padding: 0.5rem !important; gap: 0.5rem !important; } }
        @media (max-width: 360px) { .payment-grid { padding: 0.4rem !important; gap: 0.4rem !important; } }
      `}</style>
    </main>
  );
}