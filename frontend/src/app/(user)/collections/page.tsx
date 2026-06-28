"use client";

import React, { useState, useMemo, useEffect } from "react";
import CollectionHeader from "./components/CollectionHeader";
import CollectionFilter, { SortDate, SortAmount, SortCategory } from "./components/CollectionFilter";
import CollectionList from "./components/CollectionList";
import { Collection } from "./components/CollectionCard";

export type StatusFilter = "All" | "New" | "Pending" | "Failed";

function parseAmount(amount: string): number {
  return parseInt(amount.replace(/[^0-9]/g, ""), 10);
}

function formatRp(n: number): string {
  return `Rp ${Number(n).toLocaleString("id-ID")}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function mapStatus(orderStatus: string, paymentStatus: string | null): Collection["status"] {
  const s = paymentStatus ?? orderStatus;
  if (s === "settlement" || s === "paid") return "New";
  if (s === "pending") return "Pending";
  return "Failed";
}

export default function Page() {
  const [searchQuery, setSearchQuery]     = useState<string>("");
  const [activeFilter, setActiveFilter]   = useState<StatusFilter>("All");
  const [sortDate, setSortDate]           = useState<SortDate>("Newest First");
  const [sortAmount, setSortAmount]       = useState<SortAmount>("Highest Amount");
  const [sortCategory, setSortCategory]   = useState<SortCategory>("All");
  const [lastSort, setLastSort]           = useState<"date" | "amount">("date");
  const [collections, setCollections]     = useState<Collection[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load collections.");
        return res.json();
      })
      .then((data) => {
        const mapped: Collection[] = (data.orders ?? []).map((o: any) => ({
          id:         `INV-${String(o.order_id).padStart(3, "0")}`,
          order_id:   o.order_id,
          project_id: o.project_id,
          title:      o.project?.title ?? "-",
          location:   o.project?.city?.name ?? "-",
          category:   o.project?.category?.name ?? "-",
          date:       formatDate(o.payment?.payment_time ?? o.created_at),
          totalData:  String(o.project?.total_data ?? "-"),
          amount:     formatRp(o.total_amount),
          status:     mapStatus(o.order_status, o.payment?.payment_status ?? null),
          thumbnail:  o.project?.thumbnail ?? undefined,
        }));
        setCollections(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSortDateChange   = (val: SortDate)   => { setSortDate(val);   setLastSort("date"); };
  const handleSortAmountChange = (val: SortAmount) => { setSortAmount(val); setLastSort("amount"); };

  const stats = useMemo(() => ({
    total:   collections.length,
    paid:    collections.filter((t) => t.status === "New").length,
    pending: collections.filter((t) => t.status === "Pending").length,
    failed:  collections.filter((t) => t.status === "Failed").length,
  }), [collections]);

  const filtered = useMemo(() => {
    let result = [...collections];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== "All") {
      result = result.filter((t) => t.status === activeFilter);
    }

    if (sortCategory !== "All") {
      result = result.filter((t) => t.category === sortCategory);
    }

    if (lastSort === "date") {
      result.sort((a, b) => sortDate === "Newest First"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      result.sort((a, b) => sortAmount === "Highest Amount"
        ? parseAmount(b.amount) - parseAmount(a.amount)
        : parseAmount(a.amount) - parseAmount(b.amount)
      );
    }

    return result;
  }, [collections, searchQuery, activeFilter, sortDate, sortAmount, sortCategory, lastSort]);

  return (
    <div style={{
      minHeight: "100vh", background: "#FFFFFF",
      padding: "20px clamp(16px, 4vw, 40px) 40px",
      boxSizing: "border-box",
    }}>
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

        <div style={{
          background: "#FFFFFF", borderRadius: 20,
          padding: "clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px) 32px",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        }}>
          {loading ? (
            <div>
              {[1,2,3,4].map((i) => (
                <div key={i} style={{ height: 80, borderRadius: 12, background: "#F3F4F6", marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
              ))}
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#DC2626", fontWeight: 600 }}>{error}</div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}