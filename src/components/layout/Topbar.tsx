// src/components/layout/Topbar.tsx
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Menu,
  Search,
  Bell,
  UserCircle2,
  FileText,
  Image,
  StickyNote,
  MapPin,
  UserRound,
  Briefcase,
  AlertTriangle,
  FilePlus2,
  RefreshCw,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react';
import { mockCases, mockEvidence, mockTimelineEvents, mockNotifications as initialNotifications, currentUser } from '../../data/mockData';
import type { NotificationType, View } from '../../types';
import InfoModal from '../shared/InfoModal';

interface TopbarProps {
  onToggleSidebar: () => void;
  title: string;
  onNavigate: (view: View) => void;
}

const notificationConfig: Record<NotificationType, { icon: typeof Bell; accent: string }> = {
  alert: { icon: AlertTriangle, accent: 'text-red-400 bg-red-400/10 border-red-400/20' },
  evidence: { icon: FilePlus2, accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  status: { icon: RefreshCw, accent: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  interview: { icon: MessageSquare, accent: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
};

const evidenceTypeIcon = {
  document: FileText,
  photo: Image,
  note: StickyNote,
  location: MapPin,
  person: UserRound,
};

export default function Topbar({ onToggleSidebar, title, onNavigate }: TopbarProps) {
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [infoModal, setInfoModal] = useState<'settings' | 'help' | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC closes any open dropdown
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { cases: [], evidence: [], events: [] };

    return {
      cases: mockCases.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 4),
      evidence: mockEvidence.filter((e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)).slice(0, 4),
      events: mockTimelineEvents.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);

  const hasResults = results.cases.length + results.evidence.length + results.events.length > 0;
  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleResultClick(view: View) {
    onNavigate(view);
    setSearchOpen(false);
    setQuery('');
  }

  function handleNotifToggle() {
    const opening = !notifOpen;
    setNotifOpen(opening);
    if (opening && unreadCount > 0) {
      // mark all as read when panel opens
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  }

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
        {/* Search */}
        <div className="relative hidden md:block" ref={searchRef}>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-64 focus-within:border-amber-400/40 transition-colors">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => e.key === 'Escape' && (e.currentTarget as HTMLInputElement).blur()}
              placeholder="Search evidence, cases..."
              className="bg-transparent text-sm text-slate-300 placeholder:text-slate-500 outline-none w-full"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-500 hover:text-slate-300 shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {searchOpen && query && (
            <div className="absolute right-0 mt-2 w-96 max-h-[28rem] overflow-y-auto bg-[#0B0F14] border border-white/10 rounded-xl shadow-2xl shadow-black/50 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {!hasResults && (
                <p className="text-[11px] text-slate-600 font-mono text-center py-6">No results for "{query}"</p>
              )}

              {results.cases.length > 0 && (
                <div className="mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wide text-slate-500 px-1">Cases</span>
                  <div className="mt-1 space-y-1">
                    {results.cases.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleResultClick('cases')}
                        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-sm text-slate-300 truncate">{c.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.evidence.length > 0 && (
                <div className="mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wide text-slate-500 px-1">Evidence</span>
                  <div className="mt-1 space-y-1">
                    {results.evidence.map((e) => {
                      const Icon = evidenceTypeIcon[e.type];
                      return (
                        <button
                          key={e.id}
                          onClick={() => handleResultClick('board')}
                          className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="text-sm text-slate-300 truncate">{e.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.events.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wide text-slate-500 px-1">Timeline</span>
                  <div className="mt-1 space-y-1">
                    {results.events.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleResultClick('timeline')}
                        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span className="text-sm text-slate-300 truncate">{t.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleNotifToggle}
            className="text-slate-400 hover:text-white transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-[#0B0F14]">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-[26rem] overflow-y-auto bg-[#0B0F14] border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <span className="text-[11px] font-mono text-slate-500">All read</span>
              </div>
              <div className="p-2">
                {notifications.map((n) => {
                  const { icon: Icon, accent } = notificationConfig[n.type];
                  return (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${accent}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-200">{n.title}</p>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{n.description}</p>
                        <span className="text-[10px] font-mono text-slate-600 mt-1 block">{n.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen((prev) => !prev)} className="block" aria-label="Profile menu">
            <UserCircle2 className="w-8 h-8 text-slate-500 hover:text-slate-300 transition-colors" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0B0F14] border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-4 border-b border-white/10">
                <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                <p className="text-[11px] text-amber-400 font-mono mt-0.5">{currentUser.role}</p>
                <p className="text-[11px] text-slate-500 mt-1 truncate">{currentUser.email}</p>
              </div>
              <div className="p-1.5">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button
                  onClick={() => {
                    setInfoModal('settings');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button
                  onClick={() => {
                    setInfoModal('help');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" /> Help
                </button>
                <div className="my-1 border-t border-white/10" />
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {infoModal && (
        <InfoModal
          title={infoModal === 'settings' ? 'Settings' : 'Help'}
          message="This prototype focuses on investigation workflows. Account settings are outside the current frontend scope."
          onClose={() => setInfoModal(null)}
        />
      )}
    </header>
  );
}