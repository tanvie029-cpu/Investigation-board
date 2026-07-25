import { useState } from 'react';
import { Clock } from 'lucide-react';
import { mockTimelineEvents } from '../../data/mockData';
import type { TimelineEventType } from '../../types';
import TimelineEventCard from './TimelineEventCard';

type FilterKey = 'all' | 'evidence' | 'interviews' | 'status' | 'alerts';

const filters: { key: FilterKey; label: string; types: TimelineEventType[] | null }[] = [
  { key: 'all', label: 'All', types: null },
  { key: 'evidence', label: 'Evidence', types: ['evidence_added', 'discovery'] },
  { key: 'interviews', label: 'Interviews', types: ['interview'] },
  { key: 'status', label: 'Status', types: ['status_changed'] },
  { key: 'alerts', label: 'Alerts', types: ['alert'] },
];

export default function TimelineView() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const activeTypes = filters.find((f) => f.key === activeFilter)?.types ?? null;
  const events = mockTimelineEvents
    .filter((e) => (activeTypes ? activeTypes.includes(e.type) : true))
    .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-[#0E1319] border border-white/10 rounded-xl p-4 lg:p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Investigation Timeline</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label }) => {
            const active = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                  active
                    ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                    : 'text-slate-400 border-white/10 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-3xl">
        {events.map((event, i) => (
          <TimelineEventCard key={event.id} event={event} isLast={i === events.length - 1} />
        ))}
        {events.length === 0 && (
          <div className="text-center text-[11px] text-slate-600 font-mono py-10 border border-dashed border-white/10 rounded-lg">
            No events for this filter
          </div>
        )}
      </div>
    </div>
  );
}