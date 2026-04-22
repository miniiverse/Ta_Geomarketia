"use client";

import React, { useState, useCallback  } from "react";
import { StatusFilter } from "../page";

export type SortCategory = "All" | "Retail" | "Healthcare" | "Food & Beverage" 
export type SortDate = "Newest First" | "Oldest First";
export type SortAmount = "Highest Amount" | "Lowest Amount";

interface CollectionFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
  sortDate: SortDate;
  onSortDateChange: (sort: SortDate) => void;
  sortAmount: SortAmount;
  onSortAmountChange: (sort: SortAmount) => void;
  sortCategory: SortCategory;
  onSortCategoryChange: (sort: SortCategory) => void;
}

const dropdownMenuStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  background: "#FFFFFF",
  borderRadius: 12,
  border: "1.5px solid #E2E8F0",
  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
  zIndex: 100,
  minWidth: 160,
  overflow: "hidden",
};

function SortDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  openId,
  id,
  onToggle,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (val: T) => void;
  openId: string | null;
  id: string;
  onToggle: (id: string | null) => void;
}) {
  const open = openId === id;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
  if (!open) return; // kalau tidak open, tidak perlu listener
  const handler = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onToggle(null);
    }
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, [open]); // hapus onToggle dari deps

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => onToggle(open ? null : id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderRadius: 10,
          border: `1.5px solid ${open ? "#1A56DB" : "#E2E8F0"}`,
          background: open ? "#EFF6FF" : "#FFFFFF",
          fontSize: 14,
          fontWeight: 600,
          color: "#0F172A",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          whiteSpace: "nowrap",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        <span style={{ fontSize: 12, color: open ? "#1A56DB" : "#0F172A", fontWeight: 500 }}>
          {label}:
        </span>
        {value}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}
        >
          <path d="M6 9l6 6 6-6" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={dropdownMenuStyle}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); onToggle(null); }}
              style={{
                display: "block",
                width: "100%",
                padding: "11px 16px",
                textAlign: "left",
                border: "none",
                background: value === opt ? "#EFF6FF" : "#FFFFFF",
                color: value === opt ? "#1A56DB" : "#334155",
                fontSize: 14,
                fontWeight: value === opt ? 700 : 500,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
              onMouseLeave={(e) => { if (value !== opt) (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CollectionFilter ({
  searchQuery,
  onSearchChange,
  sortDate,
  onSortDateChange,
  sortAmount,
  onSortAmountChange,
  sortCategory,
  onSortCategoryChange,
}: CollectionFilterProps) {
   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const handleToggle = useCallback((id: string | null) => {
    setOpenDropdown(id);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 24,
        flexWrap: "wrap",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="2" />
          <path
            d="M16.5 16.5L21 21"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: "100%",
            padding: "11px 14px 11px 42px",
            borderRadius: 10,
            border: "1.5px solid #E2E8F0",
            background: "#FFFFFF",
            fontSize: 14,
            color: "#0F172A",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1A56DB")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
      </div>

     <SortDropdown<SortCategory>
  id="category"
  label="Category"
  value={sortCategory}
  options={["All", "Retail", "Healthcare", "Food & Beverage"]}
  onChange={onSortCategoryChange}
  openId={openDropdown}
  onToggle={handleToggle}
/>

<SortDropdown<SortDate>
  id="date"
  label="Date"
  value={sortDate}
  options={["Newest First", "Oldest First"]}
  onChange={onSortDateChange}
  openId={openDropdown}
  onToggle={handleToggle}
/>

<SortDropdown<SortAmount>
  id="amount"
  label="Amount"
  value={sortAmount}
  options={["Highest Amount", "Lowest Amount"]}
  onChange={onSortAmountChange}
  openId={openDropdown}
  onToggle={handleToggle}
/>
    </div>
  );
}
