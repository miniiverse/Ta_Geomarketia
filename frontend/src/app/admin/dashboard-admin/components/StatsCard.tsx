"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ExportPDFCard() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const dashboard =
        document.querySelector<HTMLElement>("[data-pdf-content]");
      if (!dashboard) {
        alert("Dashboard content not found.");
        setLoading(false);
        return;
      }

      const canvas = await html2canvas(dashboard, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#F5F7FB",
        logging: false,
        windowWidth: 1280,
        onclone: (clonedDocument) => {
          clonedDocument
            .querySelectorAll<HTMLElement>("[data-pdf-exclude]")
            .forEach((element) => {
              element.style.display = "none";
            });

          const clonedContent =
            clonedDocument.querySelector<HTMLElement>("[data-pdf-content]");
          if (clonedContent) {
            clonedContent.style.width = "1180px";
            clonedContent.style.padding = "8px 0 20px";
            clonedContent.style.boxSizing = "border-box";
          }
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentW = pageW - margin * 2;
      const imgW = canvas.width;
      const imgH = canvas.height;
      const ratio = contentW / imgW;
      const totalH = imgH * ratio;

      const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184);
      pdf.text(`Geomarketia Dashboard Report — ${today}`, margin, 7);

      let yOffset = 0;
      const usableH = pageH - 14;
      let page = 0;

      while (yOffset < totalH) {
        if (page > 0) pdf.addPage();

        const srcY = yOffset / ratio;
        const sliceH = Math.min(usableH / ratio, imgH - srcY);

        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = imgW;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, srcY, imgW, sliceH, 0, 0, imgW, sliceH);

        const sliceData = sliceCanvas.toDataURL("image/png");
        pdf.addImage(sliceData, "PNG", margin, 10, contentW, sliceH * ratio);

        yOffset += usableH;
        page++;
      }

      const filename = `geomarketia-dashboard-${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error(err);
      alert("Gagal export PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-pdf-exclude
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "22px 22px 18px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            color: "#64748b",
          }}
        >
          Export PDF
        </p>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#dc2626",
            flexShrink: 0,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
      </div>

      <button
        onClick={handleExport}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
          padding: "8px 14px",
          borderRadius: "10px",
          border: "none",
          background: loading ? "#94a3b8" : "#dc2626",
          color: "#fff",
          fontSize: "12.5px",
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 1px 4px rgba(220,38,38,0.25)",
          transition: "all 0.15s",
          width: "100%",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.background = "#b91c1c";
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.background = "#dc2626";
        }}
      >
        {loading ? (
          <>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "spin 1s linear infinite" }}
            >
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
              <path d="M21 12a9 9 0 00-9-9" />
            </svg>
            Generating...
          </>
        ) : (
          <>
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
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Export PDF
          </>
        )}
      </button>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function StatCards() {
  const [totalProjects, setTotalProjects] = useState<string>("...");
  const [totalUsers, setTotalUsers] = useState<string>("...");
  const [totalEarnings, setTotalEarnings] = useState<string>("...");

  useEffect(() => {
    fetch("/api/project", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const total =
          json.meta?.total ?? (Array.isArray(json.data) ? json.data.length : 0);
        setTotalProjects(String(total));
      })
      .catch(() => setTotalProjects("0"));

    fetch("/api/users", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const total =
          json.total ?? (Array.isArray(json.data) ? json.data.length : 0);
        setTotalUsers(String(total));
      })
      .catch(() => setTotalUsers("0"));

    fetch("/api/transactions-admin?per_page=1", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const revenue = Number(json.stats?.total_revenue ?? 0);
        setTotalEarnings(formatRupiah(Number.isFinite(revenue) ? revenue : 0));
      })
      .catch(() => setTotalEarnings(formatRupiah(0)));
  }, []);

  const isLoading = (label: string) =>
    (label === "Total Project" && totalProjects === "...") ||
    (label === "Registered Users" && totalUsers === "...") ||
    (label === "Total Earnings" && totalEarnings === "...");

  const regularStats = [
    {
      label: "Total Project",
      value: totalProjects,
      href: "/admin/projects",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 7h20M2 12h20M2 17h20" />
          <circle cx="5" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="5" cy="17" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
      color: "#1A56DB",
      bg: "#EBF3FF",
      border: "#BFDBFE",
    },
    {
      label: "Total Earnings",
      value: totalEarnings,
      href: "/admin/transactions",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      color: "#059669",
      bg: "#ECFDF5",
      border: "#A7F3D0",
    },
    {
      label: "Registered Users",
      value: totalUsers,
      href: "/admin/registered-users",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      color: "#7c3aed",
      bg: "#F5F3FF",
      border: "#DDD6FE",
    },
  ];

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
    (e.currentTarget as HTMLElement).style.boxShadow =
      "0 8px 24px rgba(26,86,219,0.1)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
    (e.currentTarget as HTMLElement).style.boxShadow =
      "0 1px 8px rgba(26,86,219,0.05)";
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {regularStats.map((stat) => {
          const baseStyle: React.CSSProperties = {
            background: "#ffffff",
            borderRadius: "16px",
            padding: "22px 22px 18px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: stat.href ? "pointer" : "default",
            textDecoration: "none",
          };

          const content = (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    color: "#64748b",
                  }}
                >
                  {stat.label}
                </p>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: stat.bg,
                    border: `1px solid ${stat.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "28px",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    color: isLoading(stat.label) ? "#94a3b8" : "#0f172a",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            </>
          );

          return stat.href ? (
            <Link
              key={stat.label}
              href={stat.href}
              style={baseStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {content}
            </Link>
          ) : (
            <div
              key={stat.label}
              style={baseStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {content}
            </div>
          );
        })}

        <ExportPDFCard />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}
