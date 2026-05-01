"use client";

import ProjectFilter from "./ProjectFilter";
import ProjectGrid, { ProjectFilters } from "./ProjectGrid";

interface ProjectLayoutProps {
  filters?: ProjectFilters;
  onFilterChange?: (filters: Partial<ProjectFilters>) => void;
  onPageChange?: (page: number) => void;
  onTotalChange?: (total: number) => void;
  onYearsLoaded?: (years: number[]) => void;
}

export default function ProjectLayout({
  filters,
  onFilterChange,
  onPageChange,
  onTotalChange,
  onYearsLoaded,
}: ProjectLayoutProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 24,
        marginTop: 20,
        alignItems: "start",
      }}
    >
      <ProjectFilter
        onFilterChange={onFilterChange}
        currentFilters={filters}
      />

      <ProjectGrid
        filters={filters}
        onPageChange={onPageChange}
        onTotalChange={onTotalChange}
        onYearsLoaded={onYearsLoaded}
      />
    </div>
  );
}