export type CaseStatus = 'open' | 'in_progress' | 'review' | 'closed';
export type Priority = 'low' | 'medium' | 'high';
export type View = "dashboard" | "cases" | "board" | "timeline";
export interface Case {
  updatedAt: string; // add this field to the existing Case interface
}

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  priority: Priority;
  createdAt: string;
  evidenceCount: number;
  assignee: string;
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