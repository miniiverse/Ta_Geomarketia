import { useState, useEffect, useCallback } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  price: string;
  total_data: number;
  last_update: string;
  category: string;
  region: string;
  thumbnail: string | null;
  api_url: string | null;
  status: "New" | "Oldest";
}

export interface ProjectMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export interface ProjectFilters {
  search?: string;
  category?: string;
  city_id?: string;
  sort?: string;
  page?: number;
}

export function useProjects(filters: ProjectFilters = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [meta, setMeta] = useState<ProjectMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== "" && v !== "ALL" && v !== "All Years") {
        params.set(k, String(v));
      }
    });

    try {
      const res = await fetch(`/api/projects?${params}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.message ?? "Unknown error");

      setProjects(json.data);
      setMeta(json.meta);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Fetch failed");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return { projects, meta, loading, error, refetch: fetchProjects };
}