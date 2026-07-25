import { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Plus, Filter, ZoomIn, ZoomOut, X } from 'lucide-react';
import { mockEvidence, mockRelationships } from '../../data/mockData';
import type { Evidence } from '../../types';
import EvidenceCard from './EvidenceCard';
import ConnectionLine from './ConnectionLine';

const CARD_WIDTH = 192;
const CARD_HEIGHT = 76;

export default function EvidenceBoard() {
  const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence);
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<Evidence | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    setEvidence((prev) =>
      prev.map((ev) =>
        ev.id === active.id
          ? { ...ev, x: ev.x + delta.x / zoom, y: ev.y + delta.y / zoom }
          : ev
      )
    );
  }

  function center(ev: Evidence) {
    return { x: ev.x + CARD_WIDTH / 2, y: ev.y + CARD_HEIGHT / 2 };
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0E1319] border border-white/10 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 hover:bg-amber-400/20 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Evidence
          </button>
          <button className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg text-slate-400 border border-white/10 hover:bg-white/5 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(1)))}
            className="p-1.5 rounded-lg text-slate-400 border border-white/10 hover:bg-white/5 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.1).toFixed(1)))}
            className="p-1.5 rounded-lg text-slate-400 border border-white/10 hover:bg-white/5 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative bg-[#0E1319] border border-white/10 rounded-xl overflow-auto" style={{ height: '65vh' }}>
        <div
          className="relative"
          style={{
            width: 1000,
            height: 700,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
          }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {mockRelationships.map((rel) => {
              const source = evidence.find((e) => e.id === rel.sourceId);
              const target = evidence.find((e) => e.id === rel.targetId);
              if (!source || !target) return null;
              const p1 = center(source);
              const p2 = center(target);
              return <ConnectionLine key={rel.id} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} label={rel.label} />;
            })}
          </svg>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} onOpen={setSelected} />
            ))}
          </DndContext>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelected(null)} />
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-[#0B0F14] border-l border-white/10 z-50 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wide text-slate-500">{selected.type}</span>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{selected.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{selected.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-1 rounded border text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-[11px] text-slate-500 font-mono border-t border-white/10 pt-3 space-y-1">
              <div>Added by {selected.addedBy}</div>
              <div>{selected.addedAt}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}