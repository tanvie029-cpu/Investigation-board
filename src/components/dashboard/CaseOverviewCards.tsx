import { Clock, User } from 'lucide-react';
import { mockCases } from '../../data/mockData';
import type { CaseStatus, Priority } from '../../types';

const statusStyles: Record<CaseStatus, string> = {
  open: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  in_progress: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  review: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  closed: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const priorityDot: Record<Priority, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-slate-500',
};

export default function CaseOverviewCards() {
  return (
    <div className="bg-[#0E1319] border border-white/10 rounded-xl p-4 lg:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Case Overview</h3>
        <span className="text-[11px] font-mono text-slate-500">{mockCases.length} TOTAL</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {mockCases.map((c) => (
          <div
            key={c.id}
            className="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-white/20 hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded border ${statusStyles[c.status]}`}>
                {c.status.replace('_', ' ')}
              </span>
              <span className={`w-2 h-2 rounded-full mt-1 ${priorityDot[c.priority]}`} />
            </div>
            <h4 className="text-sm font-medium text-slate-200 leading-snug mb-3">{c.title}</h4>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" /> {c.assignee}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {c.evidenceCount} items
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}