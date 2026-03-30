import { TabType } from "../page";

function CreditCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.8" />
      <line x1="6" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="9" y="12" width="6" height="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 3H8L4 7h16l-4-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="17" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}

function QrisIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="5" y="5" width="3" height="3" fill="currentColor" />
      <rect x="16" y="5" width="3" height="3" fill="currentColor" />
      <rect x="5" y="16" width="3" height="3" fill="currentColor" />
      <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface PaymentTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "credit-card", label: "Credit Card", icon: <CreditCardIcon /> },
  { id: "bank-transfer", label: "Bank Transfer", icon: <BankIcon /> },
  { id: "e-wallet", label: "E-Wallet", icon: <WalletIcon /> },
  { id: "qris", label: "QRIS", icon: <QrisIcon /> },
];

export function PaymentTabs({ activeTab, onTabChange }: PaymentTabsProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      borderBottom: "1px solid #E5E7EB",
      background: "#FAFBFF",
    }}>
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        const isLast = idx === tabs.length - 1;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "15px 8px",
              background: isActive
                ? "#fff"
                : "transparent",
              border: "none",
              borderBottom: isActive ? "2.5px solid #1A56DB" : "2.5px solid transparent",
              borderRight: isLast ? "none" : "1px solid #EEF2FF",
              color: isActive ? "#1A56DB" : "#94A3B8",
              fontSize: "0.8rem",
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "'Inter', system-ui, sans-serif",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = "#1A56DB";
                (e.currentTarget as HTMLElement).style.background = "#F0F6FF";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }
            }}
          >
            <span style={{ flexShrink: 0 }}>{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}