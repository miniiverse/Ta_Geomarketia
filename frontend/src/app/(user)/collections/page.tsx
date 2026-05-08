"use client";

import React, { useState, useMemo } from "react";
import CollectionHeader from "./components/CollectionHeader";
import CollectionFilter, {
  SortDate,
  SortAmount,
  SortCategory,
} from "./components/CollectionFilter";
import CollectionList from "./components/CollectionList";
import { Collection } from "./components/CollectionCard";

export type StatusFilter = "All" | "Paid" | "Pending" | "Failed";

const ALL_TRANSACTIONS: Collection[] = [
  {
    id: "INV-001",
    title: "Restaurant Location Analysis",
    location: "Batu Ampar",
    category: "Food & Beverage",
    date: "Apr 20, 2024",
    totalData: "50",
    amount: "Rp 400.000",
    status: "Paid",
  },
  {
    id: "INV-002",
    title: "Retail Site Selection",
    location: "Bengkong",
    category: "Retail",
    date: "Apr 15, 2024",
    totalData: "22",
    amount: "Rp 950.000",
    status: "Paid",
  },
  {
    id: "INV-004",
    title: "Retail Market Expansion",
    location: "Batam Centre",
    category: "Retail",
    date: "Apr 12, 2024",
    totalData: "15",
    amount: "Rp 750.000",
    status: "Paid",
  },
  {
    id: "INV-003",
    title: "Emergency Coverage Map",
    location: "Sekupang",
    category: "Healthcare",
    date: "Apr 8, 2024",
    totalData: "20",
    amount: "Rp 1.100.000",
    status: "Failed",
  },
];

function parseAmount(amount: string): number {
  return parseInt(amount.replace(/[^0-9]/g, ""), 10);
}

export default function Page() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");
  const [sortDate, setSortDate] = useState<SortDate>("Newest First");
  const [sortAmount, setSortAmount] = useState<SortAmount>("Highest Amount");
  const [sortCategory, setSortCategory] = useState<SortCategory>("All");
  const [lastSort, setLastSort] = useState<"date" | "amount">("date");

  const handleSortDateChange = (val: SortDate) => {
    setSortDate(val);
    setLastSort("date");
  };

  const handleSortAmountChange = (val: SortAmount) => {
    setSortAmount(val);
    setLastSort("amount");
  };

  const stats = useMemo(
    () => ({
      total: ALL_TRANSACTIONS.length,
      paid: ALL_TRANSACTIONS.filter((t) => t.status === "Paid").length,
      pending: ALL_TRANSACTIONS.filter((t) => t.status === "Pending").length,
      failed: ALL_TRANSACTIONS.filter((t) => t.status === "Failed").length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    let result = [...ALL_TRANSACTIONS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q),
      );
    }

    if (activeFilter !== "All") {
      result = result.filter((t) => t.status === activeFilter);
    }

    if (sortCategory !== "All") {
      result = result.filter((t) => t.category === sortCategory);
    }

    if (lastSort === "date") {
      if (sortDate === "Newest First") {
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      } else {
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      }
    } else {
      if (sortAmount === "Highest Amount") {
        result.sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount));
      } else {
        result.sort((a, b) => parseAmount(a.amount) - parseAmount(b.amount));
      }
    }

    return result;
  }, [searchQuery, activeFilter, sortDate, sortAmount, sortCategory, lastSort]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: "20px clamp(16px, 4vw, 40px) 40px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <CollectionHeader
          total={stats.total}
          paid={stats.paid}
          pending={stats.pending}
          failed={stats.failed}
        />

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px) 32px",
            border: "1.5px solid #E2E8F0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <CollectionFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortDate={sortDate}
            onSortDateChange={handleSortDateChange}
            sortAmount={sortAmount}
            onSortAmountChange={handleSortAmountChange}
            sortCategory={sortCategory}
            onSortCategoryChange={setSortCategory}
          />

          <CollectionList collections={filtered} />
        </div>
      </div>
    </div>
  );
}
