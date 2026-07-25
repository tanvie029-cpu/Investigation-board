import { Search, FilePlus2, RefreshCw, MessageSquare, AlertTriangle, User, Briefcase } from 'lucide-react';
import type { TimelineEvent, TimelineEventType } from '../../types';

const typeConfig: Record<TimelineEventType, { label: string; icon: typeof Search; accent: string; dot: string }> = {
  discovery: { label: 'Discovery', icon: Search, accent: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', dot: 'bg-cyan-400' },
  evidence_added: { label: 'Evidence Added', icon: FilePlus2, accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20', dot: 'bg-amber-400' },
  status_changed: { label: 'Status Changed', icon: RefreshCw, accent: 'text-violet-400 bg-violet-400/10 border-violet-400/20', dot: 'bg-violet-400' },
  interview: { label: 'Interview', icon: MessageSquare, accent: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', dot: 'bg-emerald-400' },
  alert: { label: 'Alert', icon: AlertTriangle, accent: 'text-red-400 bg-red-400/10 border-red-400/20', dot: 'bg-red-400' },
};

interface TimelineEventCardProps {
  event: TimelineEvent;
  isLast: boolean;
}

export default function TimelineEventCard({ event, isLast }: TimelineEventCardProps) {
  const { label, icon: Icon, accent, dot } = typeConfig[event.type];

  return (
    <div className="relative pl-10 sm:pl-12">
      {/* vertical line */}
      {!isLast && (
        <span className="absolute left-[9px] sm:left-[11px] top-6 bottom-[-1.5rem] w-px bg-white/10" />
      )}
      {/* dot */}
      <span className={`absolute left-0 sm:left-[2px] top-1.5 w-[18px] h-[18px] rounded-full border-4 border-[#070A0D] ${dot}`} />

      <div className="bg-[#0E1319] border border-white/10 rounded-xl p-4 mb-6 hover:border-white/20 hover:bg-white/[0.03] transition-colors duration-150">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded border ${accent}`}>
            <Icon className="w-3 h-3" /> {label}
          </span>
          <span className="text-[11px] font-mono text-slate-500">{event.date} · {event.time}</span>
        </div>

        <h4 className="text-sm font-medium text-slate-200 mb-1">{event.title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed mb-3">{event.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono pt-2 border-t border-white/5">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" /> {event.investigator}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" /> {event.caseTitle}
          </span>
        </div>
      </div>
    </div>
  );
}