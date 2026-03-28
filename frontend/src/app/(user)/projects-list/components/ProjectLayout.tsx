"use client";

import ProjectFilter from "./ProjectFilter";
import ProjectGrid from "./ProjectGrid";

export default function ProjectLayout() {
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
      <ProjectFilter />

      <ProjectGrid />

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