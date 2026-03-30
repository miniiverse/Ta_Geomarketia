import { ProductImage } from "./ProductImage";

export interface CartItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItemType;
  formatRp: (n: number) => string;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

interface CartItemsProps {
  items: CartItemType[];
  formatRp: (n: number) => string;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIconSmall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartItemRow({ item, formatRp, onUpdateQty, onRemove }: CartItemProps) {
  const unitPrice = formatRp(item.price);

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "1rem",
      padding: "1.1rem 1.5rem",
      borderRadius: 12,
      background: "#FAFBFF",
      border: "1px solid #EEF2FF",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(26,86,219,0.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <ProductImage type={item.image as "retail" | "market"} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.97rem", color: "#111827", letterSpacing: "-0.01em" }}>
              {item.name}
            </p>
            <p style={{ margin: "5px 0 0", fontSize: "0.82rem", color: "#94A3B8", lineHeight: 1.5 }}>
              {item.description}
            </p>
            <p style={{ margin: "6px 0 0", fontSize: "0.74rem", color: "#9CA3AF", fontWeight: 500 }}>
              {unitPrice} / unit
            </p>
          </div>

          <div style={{
            flexShrink: 0, padding: "6px 14px", borderRadius: 8,
            background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
            border: "1px solid #FDE68A",
            fontSize: "0.95rem", fontWeight: 800,
            color: "#92400E",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 6px rgba(245,158,11,0.15)",
            letterSpacing: "-0.01em",
          }}>
            {formatRp(item.price * item.quantity)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>

          <div style={{
            display: "flex", alignItems: "center",
            border: "1.5px solid #E5E7EB", borderRadius: 9,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              style={{
                width: 34, height: 34, border: "none",
                background: "#F8FAFC", cursor: "pointer",
                fontSize: "1.15rem", color: "#374151",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s, color 0.15s",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#EFF6FF";
                e.currentTarget.style.color = "#1A56DB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F8FAFC";
                e.currentTarget.style.color = "#374151";
              }}
            >−</button>
            <span style={{
              width: 38, textAlign: "center",
              fontSize: "0.92rem", fontWeight: 800, color: "#1A56DB",
              borderLeft: "1.5px solid #E5E7EB", borderRight: "1.5px solid #E5E7EB",
              lineHeight: "34px", background: "#fff",
            }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.id, 1)}
              style={{
                width: 34, height: 34, border: "none",
                background: "#F8FAFC", cursor: "pointer",
                fontSize: "1.15rem", color: "#374151",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s, color 0.15s",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#EFF6FF";
                e.currentTarget.style.color = "#1A56DB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F8FAFC";
                e.currentTarget.style.color = "#374151";
              }}
            >+</button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "6px 13px", borderRadius: 7,
              border: "1.5px solid #FEE2E2", background: "#FFF5F5",
              color: "#EF4444", fontSize: "0.8rem", fontWeight: 600,
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FEE2E2";
              e.currentTarget.style.borderColor = "#FECACA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF5F5";
              e.currentTarget.style.borderColor = "#FEE2E2";
            }}
          >
            <TrashIcon /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartItem({ items, formatRp, onUpdateQty, onRemove }: CartItemsProps) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "1rem 1.5rem", borderBottom: "1px solid #EEF2FF",
        background: "linear-gradient(135deg, #F8FAFF, #EFF6FF)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
          background: "linear-gradient(135deg, #1A56DB, #2563EB)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 3px 8px rgba(26,86,219,0.3)", color: "#fff",
        }}>
          <CartIconSmall />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Shopping Cart</p>
          <p style={{ margin: 0, fontSize: "0.72rem", color: "#9CA3AF" }}>
            {items.length} item{items.length !== 1 ? "s" : ""} in cart
          </p>
        </div>
        {items.length > 0 && (
          <div style={{
            padding: "3px 10px", borderRadius: 999,
            background: "#1A56DB", color: "#fff",
            fontSize: "0.72rem", fontWeight: 700,
          }}>
            {items.length}
          </div>
        )}
      </div>

      <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#9CA3AF" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#F3F4F6",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#374151" }}>Your cart is empty</p>
            <p style={{ margin: "6px 0 0", fontSize: "0.8rem", color: "#9CA3AF" }}>Add some products to continue</p>
          </div>
        ) : (
          items.map((item) => (
            <CartItemRow key={item.id} item={item} formatRp={formatRp} onUpdateQty={onUpdateQty} onRemove={onRemove} />
          ))
        )}
      </div>
    </div>
  );
}