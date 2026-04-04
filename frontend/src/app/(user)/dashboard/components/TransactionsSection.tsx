"use client";

import { useState } from "react";

const transactions = [
  {
    title: "Restaurant Location Analysis",
    region: "Batu Ampar",
    date: "Apr 20, 2024",
    price: "Rp 400.000",
    status: "Completed",
    statusColor: "#059669",
    statusBg: "#ECFDF5",
    statusBorder: "#A7F3D0",
    type: "Food & Beverage",
    description:
      "Geo-spatial analysis of foot traffic and competitor density for a new restaurant site in Batu Ampar. Includes heatmap overlays, demographic breakdown, and a 3-year revenue projection model.",
    deliverables: [
      { name: "Heatmap Report" },
      { name: "Competitor Matrix" },
      { name: "Revenue Projection" },
    ],
    invoiceNo: "INV-2024-0041",
    paymentMethod: "Bank Transfer",
    paymentBank: "BCA",
    paymentAccount: "••• 8821",
    subtotal: "Rp 400.000",
    serviceFee: "Rp 0",
    tax: "Rp 0",
    total: "Rp 400.000",
    dueDate: "May 4, 2024",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 3v7M10 3v7M6 7h4M14 3v18M18 3v6c0 2-4 2-4 0V3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Retail Site Selection",
    region: "Bengkong",
    date: "Apr 15, 2024",
    price: "Rp 950.000",
    status: "Completed",
    statusColor: "#059669",
    statusBg: "#ECFDF5",
    statusBorder: "#A7F3D0",
    type: "Retail",
    description:
      "Comprehensive retail site evaluation across 5 candidate locations in Bengkong. Analysis covers pedestrian volume, parking accessibility, proximity to anchor tenants, and lease cost benchmarking.",
    deliverables: [
      { name: "Site Comparison Report" },
      { name: "Traffic Study" },
      { name: "Lease Summary" },
    ],
    invoiceNo: "INV-2024-0038",
    paymentMethod: "Virtual Account",
    paymentBank: "Mandiri",
    paymentAccount: "••• 5533",
    subtotal: "Rp 950.000",
    serviceFee: "Rp 0",
    tax: "Rp 0",
    total: "Rp 950.000",
    dueDate: "Apr 29, 2024",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 8h12l-1 12H7L6 8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 8a3 3 0 016 0" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Emergency Coverage Map",
    region: "Sekupang",
    date: "Apr 8, 2024",
    price: "Rp 1.100.000",
    status: "Completed",
    statusColor: "#059669",
    statusBg: "#ECFDF5",
    statusBorder: "#A7F3D0",
    type: "Healthcare",
    description:
      "Mapping of emergency service response times and coverage gaps across Sekupang district. Provides actionable recommendations for new clinic placements to reduce average response time by 18%.",
    deliverables: [
      { name: "Coverage Gap Analysis" },
      { name: "Response Time Map" },
      { name: "Placement Recommendations" },
    ],
    invoiceNo: "INV-2024-0033",
    paymentMethod: "QRIS",
    paymentBank: "GoPay",
    paymentAccount: "••• 7204",
    subtotal: "Rp 1.100.000",
    serviceFee: "Rp 0",
    tax: "Rp 0",
    total: "Rp 1.100.000",
    dueDate: "Apr 22, 2024",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 9v4M10 11h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

type Tab = "detail" | "invoice";

function DetailModal({
  item,
  onClose,
}: {
  item: (typeof transactions)[0];
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("detail");

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 25, 60, 0.45)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeInOverlay 0.22s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: 22,
          width: "100%",
          maxWidth: 520,
          boxShadow:
            "0 24px 60px rgba(26,86,219,0.18), 0 2px 12px rgba(26,86,219,0.1)",
          border: "1.5px solid #DBEAFE",
          overflow: "hidden",
          animation: "slideUpModal 0.26s cubic-bezier(0.16,1,0.3,1)",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1A56DB 0%, #1e40af 100%)",
            padding: "22px 24px 0",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "rgba(255,255,255,0.18)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: "0 0 3px",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono','Fira Code',monospace",
                }}
              >
                {item.region} · {item.type}
              </p>
              <h3
                style={{
                  margin: "0 0 6px",
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                }}
              >
                {item.title}
              </h3>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 10px",
                  borderRadius: 20,
                  background:
                    item.status === "Completed"
                      ? "rgba(5,150,105,0.25)"
                      : "rgba(217,119,6,0.25)",
                  border: `1px solid ${item.status === "Completed" ? "rgba(5,150,105,0.4)" : "rgba(217,119,6,0.4)"}`,
                  fontSize: 10,
                  fontWeight: 700,
                  color: item.status === "Completed" ? "#6ee7b7" : "#fcd34d",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background:
                      item.status === "Completed" ? "#6ee7b7" : "#fcd34d",
                    display: "inline-block",
                  }}
                />
                {item.status}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 4 }}>
            {(["detail", "invoice"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "9px 20px",
                  border: "none",
                  borderRadius: "10px 10px 0 0",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  textTransform: "capitalize",
                  transition: "all 0.18s",
                  background:
                    activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.1)",
                  color:
                    activeTab === tab ? "#1A56DB" : "rgba(255,255,255,0.7)",
                  position: "relative",
                }}
              >
                {tab === "detail" ? (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Detail
                  </span>
                ) : (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 14l2 2 4-4M7 21h10a2 2 0 002-2V9l-5-5H7a2 2 0 00-2 2v13a2 2 0 002 2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Invoice
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "1.5px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.12)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.12)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div style={{ overflowY: "auto", flex: 1 }}>
          {activeTab === "detail" ? (
            <div style={{ padding: "20px 24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                {[
                  {
                    label: "Date",
                    value: item.date,
                    icon: (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "Amount",
                    value: item.price,
                    icon: (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "Due Date",
                    value: item.dueDate,
                    icon: (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 6v6l4 2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                  },
                ].map((meta) => (
                  <div
                    key={meta.label}
                    style={{
                      background: "#F8FAFF",
                      border: "1px solid #E0ECFF",
                      borderRadius: 10,
                      padding: "10px 12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 5,
                        color: "#94A3B8",
                      }}
                    >
                      {meta.icon}
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontFamily: "'JetBrains Mono',monospace",
                        }}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#0F172A",
                        letterSpacing: "-0.01em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {meta.value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(26,86,219,0.45)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Summary
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "#475569",
                    lineHeight: 1.65,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(26,86,219,0.45)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Deliverables
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {item.deliverables.map((d, i) => (
                    <div
                      key={d.name}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 14px",
                        background: "#F8FAFF",
                        border: "1px solid #E0ECFF",
                        borderRadius: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 7,
                          background: "linear-gradient(135deg,#1A56DB,#3b82f6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#1e3a8a",
                            }}
                          >
                            {d.name}
                          </span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: "#94A3B8",
                              letterSpacing: "0.08em",
                              fontFamily: "'JetBrains Mono',monospace",
                            }}
                          >
                            #{String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 11,
                            color: "#64748B",
                            lineHeight: 1.6,
                          }}
                        ></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "20px 24px" }}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #F0F7FF 0%, #EBF3FF 100%)",
                  border: "1.5px solid #DBEAFE",
                  borderRadius: 14,
                  padding: "16px 18px",
                  marginBottom: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "rgba(26,86,219,0.5)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "'JetBrains Mono',monospace",
                      marginBottom: 4,
                    }}
                  >
                    Invoice Number
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#1A56DB",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.invoiceNo}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "rgba(26,86,219,0.5)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "'JetBrains Mono',monospace",
                      marginBottom: 4,
                    }}
                  >
                    Due Date
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}
                  >
                    {item.dueDate}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(26,86,219,0.45)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Payment Method
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: "#F8FAFF",
                    border: "1.5px solid #E0ECFF",
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "linear-gradient(135deg,#1A56DB,#2563eb)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="2"
                        y="5"
                        width="20"
                        height="14"
                        rx="3"
                        stroke="white"
                        strokeWidth="1.8"
                      />
                      <path d="M2 10h20" stroke="white" strokeWidth="1.8" />
                      <path
                        d="M6 15h4"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0F172A",
                      }}
                    >
                      {item.paymentMethod}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}
                    >
                      {item.paymentBank} · {item.paymentAccount}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "4px 10px",
                      background:
                        item.status === "Completed" ? "#ECFDF5" : "#FFFBEB",
                      border: `1px solid ${item.status === "Completed" ? "#A7F3D0" : "#FDE68A"}`,
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 700,
                      color:
                        item.status === "Completed" ? "#059669" : "#D97706",
                    }}
                  >
                    {item.status === "Completed" ? "Paid" : "Unpaid"}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 4 }}>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(26,86,219,0.45)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Cost Breakdown
                </p>
                <div
                  style={{
                    background: "#F8FAFF",
                    border: "1.5px solid #E0ECFF",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                ></div>
              </div>

              <div
                style={{
                  background: "#F0F7FF",
                  border: "1.5px solid #DBEAFE",
                  borderRadius: 12,
                  overflow: "hidden",
                  marginTop: 10,
                  marginBottom: 4,
                }}
              >
                {[
                  { label: "Subtotal", value: item.subtotal },
                  { label: "Service Fee", value: item.serviceFee },
                  { label: "Tax (0%)", value: item.tax },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "9px 16px",
                      borderBottom: "1px dashed #DBEAFE",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#64748B" }}>
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#0F172A",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "13px 16px",
                    background:
                      "linear-gradient(135deg, #1A56DB 0%, #1e40af 100%)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {item.total}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: "14px 24px",
            borderTop: "1.5px solid #E0ECFF",
            background: "#F8FAFF",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              border: "1.5px solid #BFDBFE",
              background: "#EBF3FF",
              color: "#1A56DB",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#DBEAFE";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
            }}
          >
            Close
          </button>
          <button
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg,#1A56DB,#2563eb)",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "opacity 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            {activeTab === "invoice" ? (
              <>
                Download Invoice
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            ) : (
              <>
                Download Detail
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TransactionsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeDetail, setActiveDetail] = useState<number | null>(null);

  return (
    <div style={{ marginTop: 28, fontFamily: "'Inter', sans-serif" }}>
      {activeDetail !== null && (
        <DetailModal
          item={transactions[activeDetail]}
          onClose={() => setActiveDetail(null)}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 3px",
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(26,86,219,0.45)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            HISTORY · PAYMENT RECORDS
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#1A56DB",
              letterSpacing: "-0.03em",
            }}
          >
            Recent Transactions
          </h2>
        </div>
        <a
          href="/transactions"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            background: "#EBF3FF",
            border: "1.5px solid #BFDBFE",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#1A56DB",
            letterSpacing: "0.01em",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#DBEAFE";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
          }}
        >
          View All
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div
        style={{
          background: "#ffffff",
          border: "1.5px solid #E0ECFF",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(26,86,219,0.07)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 160px 120px 44px",
            padding: "12px 20px",
            background: "#F0F7FF",
            borderBottom: "1.5px solid #E0ECFF",
          }}
        >
          {["Transaction", "Date", "Amount", "Action", ""].map((h) => (
            <span
              key={h}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(26,86,219,0.45)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono','Fira Code',monospace",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {transactions.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 160px 120px 44px",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom:
                i !== transactions.length - 1 ? "1px solid #EBF3FF" : "none",
              background: hovered === i ? "#F7FAFF" : "transparent",
              transition: "background 0.18s",
              cursor: "default",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "#EBF3FF",
                  border: "1.5px solid #BFDBFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1A56DB",
                  flexShrink: 0,
                  transition: "transform 0.2s",
                  transform: hovered === i ? "scale(1.08)" : "scale(1)",
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#1A56DB",
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    marginTop: 2,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {item.region} · {item.type}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "#94A3B8",
                fontSize: 12,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item.date}
            </div>

            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item.price}
            </div>

            <div>
              <button
                onClick={() => setActiveDetail(i)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1.5px solid #BFDBFE",
                  background: hovered === i ? "#EBF3FF" : "#F0F7FF",
                  color: "#1A56DB",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  fontFamily: "'Inter',sans-serif",
                  transition: "all 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#DBEAFE";
                  el.style.borderColor = "#93C5FD";
                  el.style.transform = "translateY(-1px)";
                  el.style.boxShadow = "0 4px 12px rgba(26,86,219,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = hovered === i ? "#EBF3FF" : "#F0F7FF";
                  el.style.borderColor = "#BFDBFE";
                  el.style.transform = "none";
                  el.style.boxShadow = "none";
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Detail
              </button>
            </div>
          </div>
        ))}

        <div
          style={{
            padding: "12px 20px",
            borderTop: "1.5px solid #E0ECFF",
            background: "#F0F7FF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 11, color: "#94A3B8" }}>
            Showing 3 of 12 transactions
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
              Total spent
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#1A56DB",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Rp 2.450.000
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
        @keyframes slideUpModal {
          from { opacity:0; transform: translateY(20px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
