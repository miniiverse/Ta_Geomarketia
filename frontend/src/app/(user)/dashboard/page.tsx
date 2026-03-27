import WelcomeCard from "./components/WelcomeCard";
import StatsSection from "./components/StatsSection";
import AnalysisSection from "./components/AnalysisSection";
import TransactionsSection from "./components/TransactionsSection";

export default function DashboardPage() {
  return (
    <>
      <div style={{ padding: "32px" }}>
        <WelcomeCard />
        <StatsSection />
        <AnalysisSection />
        <TransactionsSection />
      </div>
    </>
  );
}