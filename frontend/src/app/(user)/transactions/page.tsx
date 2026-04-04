"use client";

import React, { useState, useMemo } from "react";
import TransactionHeader from "./components/TransactionHeader";
import TransactionFilter from "./components/TransactionFilter";
import TransactionList from "./components/TransactionList";
import { Transaction } from "./components/TransactionCard";

export type StatusFilter = "All" | "Paid" | "Pending" | "Failed";
export type SortOption = "Newest First" | "Oldest First" | "Highest Amount" | "Lowest Amount";

const ALL_TRANSACTIONS: Transaction[] = [
  {
    id: "INV-001",
    title: "Restaurant Location Analysis",
    location: "Batu Ampar",
    category: "Food & Beverage",
    date: "Apr 20, 2024",
    payment: "QRIS",
    amount: "Rp 400.000",
    status: "Paid",
  },
  {
    id: "INV-002",
    title: "Retail Site Selection",
    location: "Bengkong",
    category: "Retail",
    date: "Apr 15, 2024",
    payment: "Bank Transfer",
    amount: "Rp 950.000",
    status: "Paid",
  },
  {
    id: "INV-004",
    title: "Retail Market Expansion",
    location: "Batam Centre",
    category: "Retail",
    date: "Apr 12, 2024",
    payment: "GoPay",
    amount: "Rp 750.000",
    status: "Paid",
  },
  {
    id: "INV-003",
    title: "Emergency Coverage Map",
    location: "Sekupang",
    category: "Healthcare",
    date: "Apr 8, 2024",
    payment: "GoPay",
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
  const [sortBy, setSortBy] = useState<SortOption>("Newest First");

  const stats = useMemo(
    () => ({
      total: ALL_TRANSACTIONS.length,
      paid: ALL_TRANSACTIONS.filter((t) => t.status === "Paid").length,
      pending: ALL_TRANSACTIONS.filter((t) => t.status === "Pending").length,
      failed: ALL_TRANSACTIONS.filter((t) => t.status === "Failed").length,
    }),
    []
  );

  const filtered = useMemo(() => {
    let result = [...ALL_TRANSACTIONS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== "All") {
      result = result.filter((t) => t.status === activeFilter);
    }

    switch (sortBy) {
      case "Newest First":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "Oldest First":
        result.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "Highest Amount":
        result.sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount));
        break;
      case "Lowest Amount":
        result.sort((a, b) => parseAmount(a.amount) - parseAmount(b.amount));
        break;
    }

    return result;
  }, [searchQuery, activeFilter, sortBy]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: "20px 40px 40px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <TransactionHeader
          total={stats.total}
          paid={stats.paid}
          pending={stats.pending}
          failed={stats.failed}
        />

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "28px 28px 32px",
            border: "1.5px solid #E2E8F0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <TransactionFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <TransactionList transactions={filtered} />
        </div>
      </div>
    </div>
  );
}