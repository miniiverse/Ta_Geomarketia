"use client";

import React, { useState, useEffect } from "react";
import TransactionCard, { Transaction } from "./TransactionCard";

const ITEMS_PER_PAGE = 4;

interface TransactionListProps {
  transactions: Transaction[];
}

function PaginationButton({
  children,
  onClick,
  active,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const base: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1.5px solid #E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s",
    userSelect: "none" as const,
    opacity: disabled ? 0.4 : 1,
  };

  const activeStyle: React.CSSProperties = {
    background: "#1A56DB",
    color: "#FFFFFF",
    border: "1.5px solid #1A56DB",
    boxShadow: "0 2px 8px rgba(26,86,219,0.25)",
  };

  const hoverStyle: React.CSSProperties = {
    background: "#F1F5F9",
    color: "#0F172A",
  };

  const defaultStyle: React.CSSProperties = {
    background: "#FFFFFF",
    color: "#64748B",
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...base,
        ...(active ? activeStyle : hovered ? hoverStyle : defaultStyle),
      }}
    >
      {children}
    </button>
  );
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever the filtered list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [transactions]);

  const totalPages = Math.max(1, Math.ceil(transactions.length / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = transactions.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
      <p
        style={{
          fontSize: 13,
          color: "#94A3B8",
          marginBottom: 16,
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Showing {paginated.length} of {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
      </p>

      {transactions.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 24px",
            color: "#94A3B8",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 12, opacity: 0.4 }}>
            <circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="1.8" />
            <path d="M16.5 16.5L21 21" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: 15, fontWeight: 600 }}>No transactions found</p>
          <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your search or filter.</p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {paginated.map((item) => (
              <TransactionCard key={item.id} data={item} />
            ))}
          </div>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 24,
            }}
          >
            {/* Prev */}
            <PaginationButton
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PaginationButton>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationButton
                key={page}
                onClick={() => setCurrentPage(page)}
                active={currentPage === page}
                disabled={false}
              >
                {page}
              </PaginationButton>
            ))}

            {/* Next */}
            <PaginationButton
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PaginationButton>
          </div>
        </>
      )}
    </div>
  );
}