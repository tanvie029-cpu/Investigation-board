import { X, Link2 } from 'lucide-react';
import type { Evidence, Relationship } from '../../types';

interface EvidenceDrawerProps {
  evidence: Evidence;
  allEvidence: Evidence[];
  relationships: Relationship[];
  onClose: () => void;
  onSelect: (evidence: Evidence) => void;
}

export default function EvidenceDrawer({ evidence, allEvidence, relationships, onClose, onSelect }: EvidenceDrawerProps) {
  const connected = relationships
    .filter((r) => r.sourceId === evidence.id || r.targetId === evidence.id)
    .map((r) => {
      const otherId = r.sourceId === evidence.id ? r.targetId : r.sourceId;
      const other = allEvidence.find((e) => e.id === otherId);
      return other ? { evidence: other, label: r.label } : null;
    })
    .filter((item): item is { evidence: Evidence; label: string } => item !== null);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-[#0B0F14] border-l border-white/10 z-50 p-5 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-wide text-slate-500">{evidence.type}</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-base font-semibold text-white mb-2">{evidence.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{evidence.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {evidence.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-1 rounded border text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-3.5 h-3.5 text-amber-400" />
            <h4 className="text-xs font-semibold text-white">Connected Evidence</h4>
          </div>
          <div className="space-y-2">
            {connected.length === 0 && (
              <p className="text-[11px] text-slate-600 font-mono">No connections</p>
            )}
            {connected.map(({ evidence: other, label }) => (
              <button
                key={other.id}
                onClick={() => onSelect(other)}
                className="w-full text-left bg-white/[0.02] border border-white/10 rounded-lg p-3 hover:border-white/20 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-200">{other.title}</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400/80">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-mono border-t border-white/10 pt-3 space-y-1">
          <div>Added by {evidence.addedBy}</div>
          <div>{evidence.addedAt}</div>
        </div>
      </div>
    </>
  );
}