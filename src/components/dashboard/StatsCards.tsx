import { FolderOpen, ScanSearch, GitBranch, AlertTriangle } from 'lucide-react';
import { mockCases } from '../../data/mockData';

const stats = [
  {
    label: 'Active Cases',
    value: mockCases.filter((c) => c.status !== 'closed').length,
    icon: FolderOpen,
    accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  },
  {
    label: 'Evidence Items',
    value: mockCases.reduce((sum, c) => sum + c.evidenceCount, 0),
    icon: ScanSearch,
    accent: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  },
  {
    label: 'Connections Mapped',
    value: 38,
    icon: GitBranch,
    accent: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  },
  {
    label: 'High Priority',
    value: mockCases.filter((c) => c.priority === 'high').length,
    icon: AlertTriangle,
    accent: 'text-red-400 bg-red-400/10 border-red-400/20',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, accent }) => (
        <div
          key={label}
          className="bg-[#0E1319] border border-white/10 rounded-xl p-4 lg:p-5 hover:border-white/20 transition-colors"
        >
          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 ${accent}`}>
            <Icon className="w-4 h-4" strokeWidth={2} />
          </div>
          <div className="text-2xl font-semibold text-white font-mono">{value}</div>
          <div className="text-xs text-slate-500 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}