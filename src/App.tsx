import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
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
          {/* Section content will be injected here in later steps */}
        </main>
      </div>
    </div>
  );
}