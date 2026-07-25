import type { Case, ActivityItem, TrendPoint, Evidence, Relationship, TimelineEvent } from '../types';

export const mockCases: Case[] = [
  { id: 'c1', title: 'Warehouse Fraud — Sector 12', status: 'in_progress', priority: 'high', createdAt: '2026-07-18', updatedAt: '2026-07-24', evidenceCount: 14, assignee: 'A. Reyes' },
  { id: 'c2', title: 'Downtown Arson Investigation', status: 'open', priority: 'high', createdAt: '2026-07-20', updatedAt: '2026-07-23', evidenceCount: 7, assignee: 'M. Chen' },
  { id: 'c3', title: 'Corporate Data Leak — Halden Inc.', status: 'review', priority: 'medium', createdAt: '2026-07-12', updatedAt: '2026-07-22', evidenceCount: 22, assignee: 'S. Okafor' },
  { id: 'c4', title: 'Missing Persons — Riverside', status: 'closed', priority: 'low', createdAt: '2026-06-30', updatedAt: '2026-07-10', evidenceCount: 31, assignee: 'A. Reyes' },
  { id: 'c5', title: 'Port Smuggling Ring', status: 'open', priority: 'medium', createdAt: '2026-07-19', updatedAt: '2026-07-21', evidenceCount: 5, assignee: 'M. Chen' },
  { id: 'c6', title: 'Insurance Claim Fraud — Unit 8', status: 'in_progress', priority: 'low', createdAt: '2026-07-15', updatedAt: '2026-07-20', evidenceCount: 9, assignee: 'S. Okafor' },
];

export const mockActivity: ActivityItem[] = [
  { id: 'a1', actor: 'A. Reyes', action: 'added evidence to', target: 'Warehouse Fraud — Sector 12', timestamp: '12 min ago' },
  { id: 'a2', actor: 'M. Chen', action: 'linked two evidence items in', target: 'Downtown Arson Investigation', timestamp: '48 min ago' },
  { id: 'a3', actor: 'S. Okafor', action: 'moved case to Review —', target: 'Corporate Data Leak', timestamp: '2 hr ago' },
  { id: 'a4', actor: 'System', action: 'flagged inconsistency in', target: 'Warehouse Fraud — Sector 12', timestamp: '3 hr ago' },
  { id: 'a5', actor: 'A. Reyes', action: 'closed case', target: 'Missing Persons — Riverside', timestamp: '1 day ago' },
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
  { id: 'e1', type: 'document', title: 'Shipping Manifest #4471', description: 'Manifest showing mismatched cargo weight for container 4471, filed 3 days before the incident.', tags: ['manifest', 'container'], addedBy: 'A. Reyes', addedAt: '2026-07-19', x: 60, y: 60 },
  { id: 'e2', type: 'photo', title: 'Warehouse CCTV Frame', description: 'Still frame from Camera 3 showing unidentified vehicle at loading bay, 02:14 AM.', tags: ['cctv', 'vehicle'], addedBy: 'M. Chen', addedAt: '2026-07-20', x: 420, y: 40 },
  { id: 'e3', type: 'note', title: 'Witness Statement — J. Alvarez', description: 'Night guard recalls hearing a truck reverse near bay 3 around 2 AM, no scheduled deliveries that night.', tags: ['witness'], addedBy: 'S. Okafor', addedAt: '2026-07-20', x: 240, y: 260 },
  { id: 'e4', type: 'location', title: 'Loading Bay 3', description: 'Primary point of entry, security badge log shows no access recorded during the window.', tags: ['scene'], addedBy: 'A. Reyes', addedAt: '2026-07-21', x: 640, y: 240 },
  { id: 'e5', type: 'document', title: 'Badge Access Log', description: 'Digital access record for the facility covering 12 AM – 6 AM on the night in question.', tags: ['log', 'access'], addedBy: 'M. Chen', addedAt: '2026-07-21', x: 60, y: 420 },
  { id: 'e6', type: 'person', title: 'J. Alvarez — Night Guard', description: 'On duty during the incident window, filed the initial witness statement.', tags: ['witness', 'staff'], addedBy: 'S. Okafor', addedAt: '2026-07-20', x: 420, y: 440 },
];

export const mockRelationships: Relationship[] = [
  { id: 'r1', sourceId: 'e1', targetId: 'e2', label: 'same container' },
  { id: 'r2', sourceId: 'e2', targetId: 'e4', label: 'location match' },
  { id: 'r3', sourceId: 'e3', targetId: 'e4', label: 'testimony' },
  { id: 'r4', sourceId: 'e4', targetId: 'e5', label: 'contradicts' },
  { id: 'r5', sourceId: 'e3', targetId: 'e6', label: 'authored by' },
];

export const mockTimelineEvents: TimelineEvent[] = [
  { id: 't1', caseTitle: 'Warehouse Fraud — Sector 12', title: 'Case Opened', investigator: 'A. Reyes', description: 'Initial report filed following discrepancy flagged by inventory audit team.', type: 'status_changed', date: '2026-07-18', time: '09:12' },
  { id: 't2', caseTitle: 'Warehouse Fraud — Sector 12', title: 'Shipping Manifest Recovered', investigator: 'A. Reyes', description: 'Manifest #4471 pulled from archive, shows mismatched cargo weight for the flagged container.', type: 'evidence_added', date: '2026-07-19', time: '14:40' },
  { id: 't3', caseTitle: 'Downtown Arson Investigation', title: 'CCTV Footage Reviewed', investigator: 'M. Chen', description: 'Camera 3 footage reveals unidentified vehicle at loading bay at 02:14 AM.', type: 'discovery', date: '2026-07-20', time: '11:05' },
  { id: 't4', caseTitle: 'Downtown Arson Investigation', title: 'Witness Interview — J. Alvarez', investigator: 'S. Okafor', description: 'Night guard recalls hearing a truck reverse near bay 3, no deliveries scheduled that night.', type: 'interview', date: '2026-07-20', time: '16:30' },
  { id: 't5', caseTitle: 'Corporate Data Leak — Halden Inc.', title: 'Access Log Anomaly Flagged', investigator: 'System', description: 'Badge access log shows no entry recorded during the incident window — inconsistency flagged automatically.', type: 'alert', date: '2026-07-21', time: '03:22' },
  { id: 't6', caseTitle: 'Corporate Data Leak — Halden Inc.', title: 'Case Moved to Review', investigator: 'S. Okafor', description: 'Sufficient evidence gathered, case escalated to review stage pending supervisor sign-off.', type: 'status_changed', date: '2026-07-22', time: '10:00' },
  { id: 't7', caseTitle: 'Missing Persons — Riverside', title: 'Case Closed', investigator: 'A. Reyes', description: 'Investigation concluded, findings archived and family notified.', type: 'status_changed', date: '2026-07-10', time: '17:45' },
];