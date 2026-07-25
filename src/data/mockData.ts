import type { Case, ActivityItem, TrendPoint } from '../types';

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