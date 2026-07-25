import StatsCards from './StatsCards';
import ActivityChart from './ActivityChart';
import ActivityFeed from './ActivityFeed';
import CaseOverviewCards from './CaseOverviewCards';

export default function Dashboard() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <StatsCards />
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          <ActivityChart />
          <CaseOverviewCards />
        </div>
        <ActivityFeed />
      </div>
    </div>
  );
}