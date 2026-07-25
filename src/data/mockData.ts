import type {
  Case,
  ActivityItem,
  TrendPoint,
  Evidence,
  Relationship,
  TimelineEvent,
} from '../types';

export const mockCases: Case[] = [
  { id: 'c1', title: 'Financial Fraud — BKC', status: 'in_progress', priority: 'high', createdAt: '2026-07-18', updatedAt: '2026-07-24', evidenceCount: 14, assignee: 'Aarav Sharma' },
  { id: 'c2', title: 'Cyber Crime — Powai', status: 'open', priority: 'high', createdAt: '2026-07-20', updatedAt: '2026-07-23', evidenceCount: 9, assignee: 'Priya Nair' },
  { id: 'c3', title: 'Corporate Data Leak — Andheri', status: 'review', priority: 'medium', createdAt: '2026-07-12', updatedAt: '2026-07-22', evidenceCount: 22, assignee: 'Sneha Kulkarni' },
  { id: 'c4', title: 'Missing Person — Navi Mumbai', status: 'closed', priority: 'low', createdAt: '2026-06-30', updatedAt: '2026-07-10', evidenceCount: 31, assignee: 'Rahul Patil' },
  { id: 'c5', title: 'Counterfeit Medicine Network — Thane', status: 'open', priority: 'medium', createdAt: '2026-07-19', updatedAt: '2026-07-21', evidenceCount: 6, assignee: 'Arjun Deshmukh' },
  { id: 'c6', title: 'Insurance Claim Fraud — Bandra', status: 'in_progress', priority: 'low', createdAt: '2026-07-15', updatedAt: '2026-07-20', evidenceCount: 8, assignee: 'Priya Nair' },
];

export const mockActivity: ActivityItem[] = [
  { id: 'a1', actor: 'Aarav Sharma', action: 'added evidence to', target: 'Financial Fraud — BKC', timestamp: '12 min ago' },
  { id: 'a2', actor: 'Priya Nair', action: 'linked two evidence items in', target: 'Cyber Crime — Powai', timestamp: '48 min ago' },
  { id: 'a3', actor: 'Sneha Kulkarni', action: 'moved case to Review —', target: 'Corporate Data Leak — Andheri', timestamp: '2 hr ago' },
  { id: 'a4', actor: 'System', action: 'flagged inconsistency in', target: 'Financial Fraud — BKC', timestamp: '3 hr ago' },
  { id: 'a5', actor: 'Rahul Patil', action: 'closed case', target: 'Missing Person — Navi Mumbai', timestamp: '1 day ago' },
];

export const mockTrend: TrendPoint[] = [
  { day: 'Mon', evidence: 4, cases: 1 },
  { day: 'Tue', evidence: 7, cases: 2 },
  { day: 'Wed', evidence: 5, cases: 1 },
  { day: 'Thu', evidence: 9, cases: 3 },
  { day: 'Fri', evidence: 6, cases: 2 },
  { day: 'Sat', evidence: 3, cases: 0 },
  { day: 'Sun', evidence: 8, cases: 1 },
];

export const mockEvidence: Evidence[] = [
  { id: 'e1', type: 'document', title: 'Bank Transfer Records — HDFC BKC Branch', description: 'Statements showing repeated transfers to shell accounts routed through a BKC branch over 6 weeks.', tags: ['bank-records', 'shell-account'], addedBy: 'Aarav Sharma', addedAt: '2026-07-19', x: 60, y: 60 },
  { id: 'e2', type: 'photo', title: 'Server Room CCTV — Powai Office', description: 'Footage from the data centre in Powai showing unauthorized after-hours server access.', tags: ['cctv', 'server-room'], addedBy: 'Priya Nair', addedAt: '2026-07-20', x: 420, y: 40 },
  { id: 'e3', type: 'note', title: 'Employee Statement — R. Iyer', description: 'IT staff at the Powai facility recalls a contractor badge being used at 1:40 AM, no scheduled maintenance that night.', tags: ['witness'], addedBy: 'Sneha Kulkarni', addedAt: '2026-07-20', x: 240, y: 260 },
  { id: 'e4', type: 'location', title: 'Data Centre — Powai', description: 'Primary breach point; access logs show a gap during the incident window.', tags: ['scene'], addedBy: 'Priya Nair', addedAt: '2026-07-21', x: 640, y: 240 },
  { id: 'e5', type: 'document', title: 'Access Card Log — Powai Facility', description: 'Digital badge log for the facility covering 12 AM – 6 AM on the night of the breach.', tags: ['log', 'access'], addedBy: 'Sneha Kulkarni', addedAt: '2026-07-21', x: 60, y: 420 },
  { id: 'e6', type: 'person', title: 'R. Iyer — IT Administrator', description: 'On duty during the breach window; filed the initial statement about the contractor badge.', tags: ['witness', 'staff'], addedBy: 'Priya Nair', addedAt: '2026-07-20', x: 420, y: 440 },
];

export const mockRelationships: Relationship[] = [
  { id: 'r1', sourceId: 'e1', targetId: 'e2', label: 'same timeframe' },
  { id: 'r2', sourceId: 'e2', targetId: 'e4', label: 'location match' },
  { id: 'r3', sourceId: 'e3', targetId: 'e4', label: 'testimony' },
  { id: 'r4', sourceId: 'e4', targetId: 'e5', label: 'contradicts' },
  { id: 'r5', sourceId: 'e3', targetId: 'e6', label: 'authored by' },
];

export const mockTimelineEvents: TimelineEvent[] = [
  { id: 't1', caseTitle: 'Financial Fraud — BKC', title: 'Case Opened', investigator: 'Aarav Sharma', description: 'Initial report filed after HDFC BKC branch flagged repeated shell-account transfers.', type: 'status_changed', date: '2026-07-18', time: '09:12' },
  { id: 't2', caseTitle: 'Financial Fraud — BKC', title: 'Bank Records Recovered', investigator: 'Aarav Sharma', description: 'Transfer statements obtained showing a pattern of transactions routed through shell accounts.', type: 'evidence_added', date: '2026-07-19', time: '14:40' },
  { id: 't3', caseTitle: 'Cyber Crime — Powai', title: 'Server Breach Footage Reviewed', investigator: 'Priya Nair', description: 'CCTV from the Powai data centre reveals unauthorized contractor badge access at 1:40 AM.', type: 'discovery', date: '2026-07-20', time: '11:05' },
  { id: 't4', caseTitle: 'Cyber Crime — Powai', title: 'Employee Interview — R. Iyer', investigator: 'Sneha Kulkarni', description: 'IT administrator confirms no scheduled maintenance during the breach window.', type: 'interview', date: '2026-07-20', time: '16:30' },
  { id: 't5', caseTitle: 'Corporate Data Leak — Andheri', title: 'Access Log Anomaly Flagged', investigator: 'System', description: 'Badge access log shows a gap during the incident window — inconsistency flagged automatically.', type: 'alert', date: '2026-07-21', time: '03:22' },
  { id: 't6', caseTitle: 'Corporate Data Leak — Andheri', title: 'Case Moved to Review', investigator: 'Sneha Kulkarni', description: 'Sufficient evidence gathered; case escalated to review pending supervisor sign-off.', type: 'status_changed', date: '2026-07-22', time: '10:00' },
  { id: 't7', caseTitle: 'Missing Person — Navi Mumbai', title: 'Case Closed', investigator: 'Rahul Patil', description: 'Investigation concluded; individual located safe in Thane, family notified.', type: 'status_changed', date: '2026-07-10', time: '17:45' },
  { id: 't8', caseTitle: 'Counterfeit Medicine Network — Thane', title: 'Raid Conducted — Thane Warehouse', investigator: 'Arjun Deshmukh', description: 'Joint raid with local authorities recovers suspected counterfeit stock from a Thane warehouse.', type: 'evidence_added', date: '2026-07-23', time: '06:15' },
];