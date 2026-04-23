// app/(user)/lib/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  region: string;
  category: string;
  price: string;
  status: "New" | "Oldest";
  image?: string;
  totalData: number;
  lastUpdate: string;
}

export const projects: Project[] = [
  {
    id: "retail-site-selection",
    title: "Retail Site Selection",
    description: "Identify the best retail locations in Batam Kota using population density and accessibility data.",
    region: "Batam Kota",
    category: "Retail",
    price: "Rp 850.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&fit=crop",
    totalData: 100,
    lastUpdate: "Apr 2, 2025",
  },
  {
    id: "fnb-hotspot-analysis",
    title: "F&B Hotspot Analysis",
    description: "Analyze high foot traffic areas in Nagoya for food & beverage business opportunities.",
    region: "Nagoya",
    category: "Food & Beverage",
    price: "Rp 650.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop",
    totalData: 250,
    lastUpdate: "Mar 28, 2025",
  },
  {
    id: "healthcare-access-gap",
    title: "Healthcare Access Gap",
    description: "Map underserved healthcare zones in Batu Aji based on population distribution.",
    region: "Batu Aji",
    category: "Healthcare",
    price: "Rp 1.200.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
    totalData: 150,
    lastUpdate: "Jan 15, 2025",
  },
  {
    id: "retail-expansion-analysis",
    title: "Retail Expansion Analysis",
    description: "Evaluate retail expansion opportunities in Bengkong using economic activity data.",
    region: "Bengkong",
    category: "Retail",
    price: "Rp 750.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&fit=crop",
    totalData: 320,
    lastUpdate: "Feb 10, 2025",
  },
  {
    id: "fnb-market-mapping",
    title: "F&B Market Mapping",
    description: "Discover potential F&B business zones in Nongsa based on tourism and traffic patterns.",
    region: "Nongsa",
    category: "Food & Beverage",
    price: "Rp 700.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop",
    totalData: 80,
    lastUpdate: "Apr 1, 2025",
  },
  {
    id: "healthcare-facility-planning",
    title: "Healthcare Facility Planning",
    description: "Plan optimal healthcare facility locations in Sekupang using demographic insights.",
    region: "Sekupang",
    category: "Healthcare",
    price: "Rp 1.150.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
    totalData: 200,
    lastUpdate: "Dec 20, 2024",
  },
  {
    id: "retail-demand-heatmap",
    title: "Retail Demand Heatmap",
    description: "Visualize retail demand concentration in Lubuk Baja using consumer spending patterns.",
    region: "Lubuk Baja",
    category: "Retail",
    price: "Rp 900.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&fit=crop",
    totalData: 450,
    lastUpdate: "Mar 31, 2025",
  },
  {
    id: "fnb-competitor-density",
    title: "F&B Competitor Density",
    description: "Analyze restaurant competition density and identify saturation zones in Batam Center.",
    region: "Batam Center",
    category: "Food & Beverage",
    price: "Rp 720.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop",
    totalData: 600,
    lastUpdate: "Jan 5, 2025",
  },
  {
    id: "healthcare-coverage-optimization",
    title: "Healthcare Coverage Optimization",
    description: "Optimize clinic placement in Tiban based on accessibility and emergency response time.",
    region: "Tiban",
    category: "Healthcare",
    price: "Rp 1.300.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
    totalData: 90,
    lastUpdate: "Apr 3, 2025",
  },
  {
    id: "retail-foot-traffic-analysis",
    title: "Retail Foot Traffic Analysis",
    description: "Measure pedestrian flow trends to identify high-performing retail zones in Nagoya.",
    region: "Nagoya",
    category: "Retail",
    price: "Rp 880.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&fit=crop",
    totalData: 400,
    lastUpdate: "Feb 22, 2025",
  },
  {
    id: "fnb-revenue-potential-map",
    title: "F&B Revenue Potential Map",
    description: "Estimate revenue potential for new cafes based on income levels and visitor patterns.",
    region: "Nongsa",
    category: "Food & Beverage",
    price: "Rp 780.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop",
    totalData: 120,
    lastUpdate: "Mar 19, 2025",
  },
  {
    id: "healthcare-service-demand",
    title: "Healthcare Service Demand",
    description: "Identify areas with high healthcare demand but limited facilities in Sei Beduk.",
    region: "Sei Beduk",
    category: "Healthcare",
    price: "Rp 1.250.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
    totalData: 180,
    lastUpdate: "Nov 30, 2024",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}