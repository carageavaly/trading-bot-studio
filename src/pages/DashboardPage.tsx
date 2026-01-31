import BotControl from "../components/dashboard/BotControl";

export default function DashboardPage() {
  return (
    <AppShell>
      <h1>Dashboard</h1>

      <BotControl />

      <PriceChart />
      <PnlChart />
      <OrderHistory />
    </AppShell>
  );
}
