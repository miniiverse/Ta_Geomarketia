import WelcomeCard from "./components/WelcomeCard";
import StatsSection from "./components/StatsSection";
import AnalysisSection from "./components/AnalysisSection";


export default function DashboardPage() {
  return (
    <>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 40px 40px",
      }}>
        <WelcomeCard />
        <StatsSection />
        <AnalysisSection />
  
      </div>
    </>
  );
}