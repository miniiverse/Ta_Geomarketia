import WelcomeCard from "./components/WelcomeCard";
import StatsSection from "./components/StatsSection";
import CollectionSection from "./components/CollectionSection";
import TransactionsSection from "./components/TransactionsSection";


export default function DashboardPage() {
  return (
    <>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 40px) 40px",
      }}>
        <WelcomeCard />
        <StatsSection />
        <CollectionSection />
        <TransactionsSection />
  
      </div>
    </>
  );
}