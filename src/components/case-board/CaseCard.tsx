import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { User, Layers } from 'lucide-react';
import type { Case, Priority } from '../../types';

const priorityStyles: Record<Priority, string> = {
  high: 'text-red-400 bg-red-400/10 border-red-400/20',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  low: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

interface CaseCardProps {
  caseItem: Case;
}

export default function CaseCard({ caseItem }: CaseCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: caseItem.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-white/20 hover:bg-white/[0.04] transition-colors cursor-grab active:cursor-grabbing touch-none"
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded border ${priorityStyles[caseItem.priority]}`}>
          {caseItem.priority}
        </span>
      </div>
      <h4 className="text-sm font-medium text-slate-200 leading-snug mb-3">{caseItem.title}</h4>
      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" /> {caseItem.assignee}
        </span>
        <span className="flex items-center gap-1">
          <Layers className="w-3 h-3" /> {caseItem.evidenceCount}
        </span>
      </div>
      <div className="text-[10px] text-slate-600 font-mono mt-2 pt-2 border-t border-white/5">
        Updated {caseItem.updatedAt}
      </div>
    </div>
  );
}