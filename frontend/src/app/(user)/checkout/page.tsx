"use client";

import { useState, useEffect } from "react";
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

// Deteksi apakah error karena project sudah dimiliki user lain
function isProjectOwnedError(msg: string | null): boolean {
  if (!msg) return false;
  const lower = msg.toLowerCase();
  return (
    lower.includes("sudah dimiliki") ||
    lower.includes("already owned") ||
    lower.includes("already purchased") ||
    lower.includes("already bought") ||
    lower.includes("owned by another")
  );
}

// Alert modal untuk project yang sudah dimiliki user lain
function ProjectOwnedAlert({
  onClose,
  onGoToProjects,
}: {
  onClose: () => void;
  onGoToProjects: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(92vw, 420px)",
          background: "#fff",
          borderRadius: "20px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(26,86,219,0.12)",
          overflow: "hidden",
          animation: "slideUp 0.25s ease",
        }}
      >
 
        <div
          style={{
            height: "5px",
            background: "linear-gradient(90deg, #EF4444 0%, #F97316 100%)",
          }}
        />

        <div style={{ padding: "28px 28px 24px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FEF2F2 0%, #FFE4E4 100%)",
              border: "2px solid #FECACA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "#DC2626",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "18px",
              fontWeight: 800,
              color: "#1E3A6E",
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
           Project Not Available
          </h2>

          <p
            style={{
              margin: "0 0 8px",
              fontSize: "13.5px",
              color: "#64748B",
              textAlign: "center",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            This project has been purchased and cannot be purchased again.
          </p>
          <p
            style={{
              margin: "0 0 24px",
              fontSize: "13px",
              color: "#94A3B8",
              textAlign: "center",
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
            }}
          >
           Please select another project that is still available.
          </p>

          <div
            style={{
              height: "1px",
              background: "#F1F5F9",
              margin: "0 0 20px",
            }}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "11px 16px",
                borderRadius: "10px",
                border: "1.5px solid #E2E8F0",
                background: "#fff",
                color: "#475569",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#F8FAFC";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#CBD5E1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#E2E8F0";
              }}
            >
              Close
            </button>

            <button
              onClick={onGoToProjects}
              style={{
                flex: 2,
                padding: "11px 16px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #1A56DB 0%, #2D7BE8 100%)",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                boxShadow: "0 4px 14px rgba(26,86,219,0.30)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
             View Other Projects
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, calc(-50% + 16px)); } to { opacity: 1; transform: translate(-50%, -50%); } }
      `}</style>
    </>
  );
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
  const isOwned   = isProjectOwnedError(errorMessage);
  const [showOwnedAlert, setShowOwnedAlert] = useState(false);

  useEffect(() => {
    if (isOwned) {
      setShowOwnedAlert(true);
    }
  }, [isOwned]);

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

  const handleGoToProjects = () => {
    router.push("/projects-list");
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#F3F4F6",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <PaymentHeader />
      {showOwnedAlert && (
        <ProjectOwnedAlert
          onClose={() => setShowOwnedAlert(false)}
          onGoToProjects={handleGoToProjects}
        />
      )}

      {errorMessage && !isOwned && (
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
          disabled={isOwned}
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