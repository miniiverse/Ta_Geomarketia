"use client";

const data = [
  {
    title: "Shopping Behavior Map - Jakarta",
    progress: 45,
    status: "In Progress",
    image: "https://source.unsplash.com/400x200/?map",
  },
  {
    title: "Demographic Analysis: Surabaya",
    status: "Completed",
    image: "https://source.unsplash.com/400x200/?city,map",
  },
  {
    title: "Market Potential Map Yogyakarta",
    status: "Completed",
    image: "https://source.unsplash.com/400x200/?satellite,map",
  },
];

export default function AnalysisSection() {
  return (
    <div
      style={{
        marginTop: 32,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 500,
              color: "#9ca3af",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Overview
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "-0.02em",
            }}
          >
            My Analysis
          </h2>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "7px 14px",
            background: "#eff4ff",
            border: "1px solid #d4e2fd",
            borderRadius: 999,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1A56DB" }}>
            View All
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="#1A56DB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {data.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid #e8eef5",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow:
                "0 2px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* IMAGE */}
            <div style={{ position: "relative" }}>
              <img
                src={item.image}
                alt="map"
                style={{
                  width: "100%",
                  height: 130,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Status badge overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    backdropFilter: "blur(6px)",
                    background:
                      item.status === "Completed"
                        ? "rgba(236,253,245,0.92)"
                        : "rgba(255,251,235,0.92)",
                    color:
                      item.status === "Completed" ? "#16A34A" : "#D97706",
                    border:
                      item.status === "Completed"
                        ? "1px solid #bbf7d0"
                        : "1px solid #fde68a",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background:
                        item.status === "Completed" ? "#16A34A" : "#D97706",
                      display: "inline-block",
                    }}
                  />
                  {item.status}
                </span>
              </div>
            </div>

            <div style={{ padding: "16px 18px 18px" }}>
              {/* TITLE */}
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1A56DB",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </p>

              {/* PROGRESS */}
              {item.progress && (
                <div style={{ marginTop: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
                      Progress
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#1A56DB",
                      }}
                    >
                      {item.progress}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "#e8eef5",
                      borderRadius: 999,
                    }}
                  >
                    <div
                      style={{
                        width: `${item.progress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #1A56DB, #3b82f6)",
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 14,
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    borderRadius: 10,
                    border: "none",
                    background: "#1A56DB",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                  View
                </button>

                {item.status === "Completed" && (
                  <button
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 10,
                      border: "1px solid #e8eef5",
                      background: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        stroke="#374151"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}