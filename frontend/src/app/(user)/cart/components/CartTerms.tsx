import { CartItem, CartItemType } from "./CartItem";

interface CartItemsProps {
  items: CartItemType[];
  formatRp: (n: number) => string;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
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

export function CartItems({ items, formatRp, onUpdateQty, onRemove }: CartItemsProps) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
     
      <div style={{
        padding: "1rem 1.5rem", borderBottom: "1px solid #F3F4F6",
        background: "#FAFAFA", display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, #1A56DB, #3B82F6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 6px rgba(26,86,219,0.28)", color: "#fff",
        }}>
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
              <CartItem item={item} formatRp={formatRp} onUpdateQty={onUpdateQty} onRemove={onRemove} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}