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
    <>
      <div
        className="project-layout-grid"
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

      <style>{`
        @media (max-width: 1024px) {
          .project-layout-grid {
            grid-template-columns: 240px 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .project-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
