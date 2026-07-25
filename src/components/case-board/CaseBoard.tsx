import { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { mockCases } from '../../data/mockData';
import type { Case, CaseStatus } from '../../types';
import CaseColumn from './CaseColumn';
import CaseCard from './CaseCard';

const statuses: CaseStatus[] = ['open', 'in_progress', 'review', 'closed'];

export default function CaseBoard() {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [activeCase, setActiveCase] = useState<Case | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragStart(event: DragStartEvent) {
    const found = cases.find((c) => c.id === event.active.id);
    setActiveCase(found ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCase(null);
    if (!over) return;

    const newStatus = over.id as CaseStatus;
    setCases((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, status: newStatus, updatedAt: 'Just now' } : c))
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {statuses.map((status) => (
          <CaseColumn key={status} status={status} cases={cases.filter((c) => c.status === status)} />
        ))}
      </div>

      <DragOverlay>
        {activeCase ? (
          <div className="rotate-2 scale-105 shadow-2xl shadow-black/50">
            <CaseCard caseItem={activeCase} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}