import { LayoutDashboard, Briefcase, Network, Clock, ShieldAlert } from 'lucide-react';
import type { View } from '../../types';

interface SidebarProps {
  activeView: View;
  onChangeView: (view: View) => void;
  isOpen: boolean;
}

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cases', label: 'Cases', icon: Briefcase },
  { id: 'board', label: 'Evidence Board', icon: Network },
  { id: 'timeline', label: 'Timeline', icon: Clock },
];

export default function Sidebar({ activeView, onChangeView, isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0B0F14] border-r border-white/10
      flex flex-col transition-transform duration-200 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
        <ShieldAlert className="w-6 h-6 text-amber-400" strokeWidth={2} />
        <span className="text-white font-semibold tracking-wide text-sm">
          CASE<span className="text-amber-400">FILE</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onChangeView(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${active
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/10 text-[11px] text-slate-500 font-mono">
        v1.0.0 — SECURE SESSION
      </div>
    </aside>
  );
}