"use client";

import TransactionHeader from "./components/TransactionHeader";
import TransactionFilter from "./components/TransactionFilter";
import TransactionList from "./components/TransactionList";

export default function TransactionPage() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 40px 40px",
        fontFamily:
          "'DM Sans', 'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <TransactionHeader />
        <TransactionFilter />
        <TransactionList />
      </div>
    </div>
  );
}