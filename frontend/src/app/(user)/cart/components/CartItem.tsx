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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartItemRow({ item, formatRp, onUpdateQty, onRemove }: CartItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
      <ProductImage type={item.image as "retail" | "market"} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem", color: "#111827" }}>{item.name}</p>
            <p style={{ margin: "5px 0 0", fontSize: "0.85rem", color: "#9CA3AF" }}>{item.description}</p>
          </div>
          <div style={{
            flexShrink: 0, padding: "6px 14px", borderRadius: 6,
            background: "#EFF6FF", border: "1px solid #BFDBFE",
            fontSize: "0.92rem", fontWeight: 700, color: "#1A56DB", whiteSpace: "nowrap",
          }}>
            {formatRp(item.price * item.quantity)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              style={{ width: 36, height: 36, border: "none", background: "#F9FAFB", cursor: "pointer", fontSize: "1.1rem", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFB")}
            >−</button>
            <span style={{ width: 40, textAlign: "center", fontSize: "0.95rem", fontWeight: 700, color: "#111827", borderLeft: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB", lineHeight: "36px" }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.id, 1)}
              style={{ width: 36, height: 36, border: "none", background: "#F9FAFB", cursor: "pointer", fontSize: "1.1rem", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFB")}
            >+</button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 7, border: "1px solid #FEE2E2", background: "#FFF5F5", color: "#EF4444", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FEE2E2")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FFF5F5")}
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
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
    
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #F3F4F6", background: "#FAFAFA", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: "linear-gradient(135deg, #1A56DB, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(26,86,219,0.28)", color: "#fff" }}>
          <CartIcon />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Shopping Cart</p>
          <p style={{ margin: 0, fontSize: "0.72rem", color: "#9CA3AF" }}>
            {items.length} item{items.length !== 1 ? "s" : ""} in cart
          </p>
        </div>
      </div>

     
      <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2.5rem 0", color: "#9CA3AF" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" />
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Your cart is empty</p>
            <p style={{ margin: "4px 0 0", fontSize: "0.78rem" }}>Add some products to continue</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={item.id}>
              {idx > 0 && <div style={{ height: 1, background: "#F3F4F6", marginBottom: "1rem" }} />}
              <CartItemRow item={item} formatRp={formatRp} onUpdateQty={onUpdateQty} onRemove={onRemove} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}