"use client";

import { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import ProjectsLayout from "./components/ProjectLayout";

export interface ProjectFilters {
  search?: string;
  category?: string;
  city_id?: string;
  sort?: string;
  project_date_year?: string;
  last_update_year?: string;
  page?: number;
}

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({
    sort: "",
  });
  const [totalProjects, setTotalProjects] = useState<number | undefined>(
    undefined,
  );

  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search: search || undefined, page: 1 }));
  }, []);

  const handleFilterChange = useCallback(
    (incoming: Partial<ProjectFilters>) => {
      setFilters((prev) => ({ ...prev, ...incoming, page: 1 }));
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return (
    <>
      <div
        className="projects-page-wrapper"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
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

      <style>{`
        .projects-page-wrapper {
          padding: 0 40px 40px;
        }

        @media (max-width: 1024px) {
          .projects-page-wrapper {
            padding: 0 24px 32px;
          }
        }

        @media (max-width: 768px) {
          .projects-page-wrapper {
            padding: 0 16px 24px;
          }
        }

        @media (max-width: 480px) {
          .projects-page-wrapper {
            padding: 0 12px 20px;
          }
        }
      `}</style>
    </>
  );
}
