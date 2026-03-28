import SearchBar from "./components/SearchBar";
import ProjectsLayout from "./components/ProjectLayout";

export default function ProjectsPage() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 40px 40px",
      }}
    >
      <SearchBar />

      <ProjectsLayout />
    </div>
  );
}