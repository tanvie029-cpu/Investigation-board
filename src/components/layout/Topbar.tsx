import { Menu, Search, Bell, UserCircle2 } from 'lucide-react';

interface TopbarProps {
  onToggleSidebar: () => void;
  title: string;
}

export default function Topbar({ onToggleSidebar, title }: TopbarProps) {
  return (
    <header className="h-16 bg-[#0B0F14]/80 backdrop-blur border-b border-white/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-white font-semibold text-base tracking-wide capitalize">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-64">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            placeholder="Search evidence, cases..."
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-500 outline-none w-full"
          />
        </div>
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
        </button>
        <UserCircle2 className="w-8 h-8 text-slate-500" />
      </div>
    </header>
  );
}