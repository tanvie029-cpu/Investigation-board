import type { Case, ActivityItem, TrendPoint, Evidence, Relationship } from '../types';

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
  { id: 'e1', type: 'document', title: 'Shipping Manifest #4471', description: 'Manifest showing mismatched cargo weight for container 4471, filed 3 days before the incident.', tags: ['manifest', 'container'], addedBy: 'A. Reyes', addedAt: '2026-07-19', x: 80, y: 60 },
  { id: 'e2', type: 'photo', title: 'Warehouse CCTV Frame', description: 'Still frame from Camera 3 showing unidentified vehicle at loading bay, 02:14 AM.', tags: ['cctv', 'vehicle'], addedBy: 'M. Chen', addedAt: '2026-07-20', x: 420, y: 90 },
  { id: 'e3', type: 'note', title: 'Witness Statement — J. Alvarez', description: 'Night guard recalls hearing a truck reverse near bay 3 around 2 AM, no scheduled deliveries that night.', tags: ['witness'], addedBy: 'S. Okafor', addedAt: '2026-07-20', x: 250, y: 280 },
  { id: 'e4', type: 'location', title: 'Loading Bay 3', description: 'Primary point of entry, security badge log shows no access recorded during the window.', tags: ['scene'], addedBy: 'A. Reyes', addedAt: '2026-07-21', x: 620, y: 260 },
  { id: 'e5', type: 'document', title: 'Badge Access Log', description: 'Digital access record for the facility covering 12 AM – 6 AM on the night in question.', tags: ['log', 'access'], addedBy: 'M. Chen', addedAt: '2026-07-21', x: 80, y: 400 },
];

export const mockRelationships: Relationship[] = [
  { id: 'r1', sourceId: 'e1', targetId: 'e2', label: 'same container' },
  { id: 'r2', sourceId: 'e2', targetId: 'e4', label: 'location match' },
  { id: 'r3', sourceId: 'e3', targetId: 'e4', label: 'testimony' },
  { id: 'r4', sourceId: 'e4', targetId: 'e5', label: 'contradicts' },
];