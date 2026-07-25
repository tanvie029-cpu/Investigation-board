import { useDroppable } from '@dnd-kit/core';
import type { Case, CaseStatus } from '../../types';
import CaseCard from './CaseCard';

const columnAccent: Record<CaseStatus, string> = {
  open: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  in_progress: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  review: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  closed: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const columnLabel: Record<CaseStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  review: 'Review',
  closed: 'Closed',
};

interface CaseColumnProps {
  status: CaseStatus;
  cases: Case[];
}

export default function CaseColumn({ status, cases }: CaseColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`bg-[#0E1319] border rounded-xl p-4 flex flex-col min-h-[400px] transition-colors ${
        isOver ? 'border-amber-400/40' : 'border-white/10'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[11px] font-mono uppercase tracking-wide px-2 py-1 rounded border ${columnAccent[status]}`}>
          {columnLabel[status]}
        </span>
        <span className="text-[11px] font-mono text-slate-500">{cases.length}</span>
      </div>
      <div className="space-y-3 flex-1">
        {cases.map((c) => (
          <CaseCard key={c.id} caseItem={c} />
        ))}
        {cases.length === 0 && (
          <div className="text-center text-[11px] text-slate-600 font-mono py-6 border border-dashed border-white/10 rounded-lg">
            No cases
          </div>
        )}
      </div>
    </div>
  );
}