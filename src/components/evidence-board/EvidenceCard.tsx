import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FileText, Image, StickyNote, MapPin } from 'lucide-react';
import type { Evidence, EvidenceType } from '../../types';

const typeConfig: Record<EvidenceType, { icon: typeof FileText; accent: string }> = {
  document: { icon: FileText, accent: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  photo: { icon: Image, accent: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  note: { icon: StickyNote, accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  location: { icon: MapPin, accent: 'text-red-400 bg-red-400/10 border-red-400/20' },
};

interface EvidenceCardProps {
  evidence: Evidence;
  onOpen: (evidence: Evidence) => void;
}

export default function EvidenceCard({ evidence, onOpen }: EvidenceCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: evidence.id,
  });

  const { icon: Icon, accent } = typeConfig[evidence.type];

  const style = {
    left: evidence.x,
    top: evidence.y,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 20 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => !isDragging && onOpen(evidence)}
      className="absolute w-48 bg-[#0E1319] border border-white/10 rounded-lg p-3 hover:border-white/20 hover:bg-white/[0.04] transition-colors cursor-grab active:cursor-grabbing touch-none shadow-lg shadow-black/30"
    >
      <div className={`w-7 h-7 rounded-md border flex items-center justify-center mb-2 ${accent}`}>
        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
      </div>
      <h4 className="text-xs font-medium text-slate-200 leading-snug mb-1 line-clamp-2">{evidence.title}</h4>
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">{evidence.type}</span>
    </div>
  );
}