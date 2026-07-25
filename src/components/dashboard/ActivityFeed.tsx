import { Activity } from 'lucide-react';
import { mockActivity } from '../../data/mockData';

export default function ActivityFeed() {
  return (
    <div className="bg-[#0E1319] border border-white/10 rounded-xl p-4 lg:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
      </div>
      <ul className="space-y-3">
        {mockActivity.map((item) => (
          <li key={item.id} className="flex gap-3 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <p className="text-slate-400 leading-snug">
              <span className="text-slate-200 font-medium">{item.actor}</span>{' '}
              {item.action}{' '}
              <span className="text-slate-200">{item.target}</span>
              <span className="block text-[11px] text-slate-600 font-mono mt-0.5">{item.timestamp}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}