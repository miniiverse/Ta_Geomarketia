"use client";

import ProjectFilter from "./ProjectFilter";
import ProjectGrid, { ProjectFilters } from "./ProjectGrid";

interface ProjectLayoutProps {
  filters?: ProjectFilters;
  onFilterChange?: (filters: Partial<ProjectFilters>) => void;
  onPageChange?: (page: number) => void;
  onTotalChange?: (total: number) => void;
}

export default function ProjectLayout({
  filters,
  onFilterChange,
  onPageChange,
  onTotalChange,
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
      <ProjectFilter onFilterChange={onFilterChange} />

      <ProjectGrid
        filters={filters}
        onPageChange={onPageChange}
        onTotalChange={onTotalChange}
      />

      <style jsx>{`
        .project-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .project-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
