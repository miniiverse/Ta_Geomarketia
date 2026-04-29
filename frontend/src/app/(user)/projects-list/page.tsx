"use client";

import { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import ProjectsLayout from "./components/ProjectLayout";

export interface ProjectFilters {
  search?: string;
  category?: string;
  city_id?: string;
  sort?: string;
  year?: string;
  page?: number;
}

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [totalProjects, setTotalProjects] = useState<number | undefined>(undefined);

  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search: search || undefined, page: 1 }));
  }, []);

  const handleFilterChange = useCallback((incoming: Partial<ProjectFilters>) => {
    setFilters((prev) => ({ ...prev, ...incoming, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 40px" }}>
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        totalProjects={totalProjects}
      />

      <ProjectsLayout
        filters={filters}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        onTotalChange={setTotalProjects}
      />
    </div>
  );
}