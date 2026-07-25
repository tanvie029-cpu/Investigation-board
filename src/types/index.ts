export type CaseStatus = 'open' | 'in_progress' | 'review' | 'closed';
export type Priority = 'low' | 'medium' | 'high';
export type View = "dashboard" | "cases" | "board" | "timeline";
export type EvidenceType = 'document' | 'photo' | 'note' | 'location' | 'person';
export type TimelineEventType = 'discovery' | 'evidence_added' | 'status_changed' | 'interview' | 'alert';

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  priority: Priority;
  createdAt: string;
  evidenceCount: number;
  assignee: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface TrendPoint {
  day: string;
  evidence: number;
  cases: number;
}

export interface Evidence {
  id: string;
  type: EvidenceType;
  title: string;
  description: string;
  tags: string[];
  addedBy: string;
  addedAt: string;
  x: number;
  y: number;
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  label: string;
}

export interface TimelineEvent {
  id: string;
  caseTitle: string;
  title: string;
  investigator: string;
  description: string;
  type: TimelineEventType;
  date: string;
  time: string;
}