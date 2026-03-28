import TransactionCard from "./TransactionCard";

const transactions = [
  {
    id: "INV-001",
    title: "Restaurant Location Analysis",
    location: "Batu Ampar",
    date: "March 5, 2026",
    payment: "QRIS",
    amount: "Rp400.000",
    status: "Paid",
  },
  {
    id: "INV-002",
    title: "Retail Site Selection",
    location: "Bengkong",
    date: "January 20, 2026",
    payment: "Bank Transfer",
    amount: "Rp950.000",
    status: "Pending",
  },
  {
    id: "INV-003",
    title: "Emergency Coverage Map",
    location: "Sekupang",
    date: "December 10, 2025",
    payment: "GoPay",
    amount: "Rp1.100.000",
    status: "Failed",
  },
];

export default function TransactionList() {
  return (
    <div>
      <p
        style={{
          fontSize: 13,
          color: "#94A3B8",
          marginBottom: 16,
          fontWeight: 500,
        }}
      >
        Showing {transactions.length} transactions
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 18,
        }}
      >
        {transactions.map((item) => (
          <TransactionCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}