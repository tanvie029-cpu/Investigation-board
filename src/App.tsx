import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from "./components/dashboard/Dashboard";
import CaseBoard from "./components/case-board/CaseBoard";
import type { View } from './types';

const viewTitles: Record<View, string> = {
  dashboard: 'Dashboard',
  cases: 'Cases',
  board: 'Evidence Board',
  timeline: 'Timeline',
};

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A0D] flex">
      <Sidebar
        activeView={activeView}
        onChangeView={(view) => {
          setActiveView(view);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
      />

      {/* mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={viewTitles[activeView]}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 p-4 lg:p-6 text-slate-300">
          {activeView === "dashboard" && <Dashboard />}

          {activeView === 'cases' && <CaseBoard />}

          {activeView === "board" && <div>Evidence Board</div>}

          {activeView === "timeline" && <div>Timeline</div>}
        </main>
      </div>
    </div>
  );
}