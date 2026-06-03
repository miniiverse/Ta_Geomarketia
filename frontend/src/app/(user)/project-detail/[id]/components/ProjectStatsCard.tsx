"use client";

type ProjectStatsCardProps = {
  projectDate: string;
  totalData: number;
  price: string;
  city?: string;
  province?: string;
};

const CITY_MAP: Record<string, string> = {
  Batam: "Batam City",
  Jakarta: "Jakarta City",
  Surabaya: "Surabaya City",
  Bandung: "Bandung City",
  Medan: "Medan City",
  Semarang: "Semarang City",
  Makassar: "Makassar City",
  Palembang: "Palembang City",
  Tangerang: "Tangerang City",
  Depok: "Depok City",
};

const PROVINCE_MAP: Record<string, string> = {
  "Kepulauan Riau": "Riau Islands",
  "DKI Jakarta": "Jakarta",
  "Jawa Barat": "West Java",
  "Jawa Tengah": "Central Java",
  "Jawa Timur": "East Java",
  "Sumatera Utara": "North Sumatra",
  "Sumatera Selatan": "South Sumatra",
  "Sulawesi Selatan": "South Sulawesi",
  "Kalimantan Barat": "West Kalimantan",
  "Kalimantan Timur": "East Kalimantan",
  "Kalimantan Selatan": "South Kalimantan",
  "Kalimantan Tengah": "Central Kalimantan",
  "Kalimantan Utara": "North Kalimantan",
  "Sulawesi Utara": "North Sulawesi",
  "Sulawesi Tengah": "Central Sulawesi",
  "Sulawesi Tenggara": "Southeast Sulawesi",
  "Sulawesi Barat": "West Sulawesi",
  "Sumatera Barat": "West Sumatra",
  "Nusa Tenggara Barat": "West Nusa Tenggara",
  "Nusa Tenggara Timur": "East Nusa Tenggara",
  "Papua Barat": "West Papua",
  "Maluku Utara": "North Maluku",
  "Bangka Belitung": "Bangka Belitung Islands",
  Banten: "Banten",
  Bali: "Bali",
  Yogyakarta: "Yogyakarta",
  Aceh: "Aceh",
  Riau: "Riau",
  Jambi: "Jambi",
  Bengkulu: "Bengkulu",
  Lampung: "Lampung",
  Gorontalo: "Gorontalo",
  Maluku: "Maluku",
  Papua: "Papua",
};

function formatCityName(city?: string): string {
  if (!city) return "-";
  return CITY_MAP[city] ?? `${city} City`;
}

function formatProvinceName(province?: string): string {
  if (!province) return "";
  return PROVINCE_MAP[province] ?? province;
}

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const BusinessIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PriceIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

type StatItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
  wrap?: boolean;
};

export default function ProjectStatsCard({
  projectDate,
  totalData,
  price,
  city,
  province,
}: ProjectStatsCardProps) {
  const cityFormatted = formatCityName(city);
  const provinceFormatted = formatProvinceName(province);
  const locationValue = city
    ? provinceFormatted
      ? `${cityFormatted}, ${provinceFormatted}`
      : cityFormatted
    : "-";

  const stats: StatItem[] = [
    {
      label: "Project Date",
      value: projectDate,
      icon: <CalendarIcon />,
    },
    {
      label: "Total Businesses",
      value: totalData.toLocaleString(),
      icon: <BusinessIcon />,
    },
    {
      label: "Starting From",
      value: price,
      icon: <PriceIcon />,
    },
    {
      label: "Location",
      value: locationValue,
      icon: <LocationIcon />,
      wrap: true,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        .stats-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        @media (max-width: 640px) {
          .stats-card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      <div className="stats-card-grid">
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              borderRadius: "14px",
              padding: "14px 18px",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: stat.wrap ? "flex-start" : "center",
              gap: "12px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#fff",
                marginTop: stat.wrap ? "2px" : "0",
              }}
            >
              {stat.icon}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "3px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: stat.wrap ? "normal" : "nowrap",
                  overflow: stat.wrap ? "visible" : "hidden",
                  textOverflow: stat.wrap ? "unset" : "ellipsis",
                  lineHeight: stat.wrap ? 1.45 : "inherit",
                  wordBreak: stat.wrap ? "break-word" : "normal",
                }}
              >
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
