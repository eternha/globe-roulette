/**
 * Group Trip Room service — local/mock implementation.
 *
 * All data lives in memory (with optional localStorage persistence).
 * No backend, no auth, no real-time. When a real backend is added:
 *  1. Replace localStorage with API calls
 *  2. Replace mock invite links with real share URLs
 *  3. Add WebSocket/SSE for live room updates
 */

import type { Destination } from "../data/types";
import type {
  TripRoom,
  TripMember,
  TripPreference,
  GroupVote,
  GroupDestinationMatch,
} from "../types/groupTrip";
import { getMemberEmoji } from "../config/groupTrip";

/* ── Storage key ───────────────────────────────────────────── */

const STORAGE_KEY = "tr_group_rooms";

/* ── Persistence helpers ───────────────────────────────────── */

function loadRooms(): readonly TripRoom[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TripRoom[];
  } catch {
    return [];
  }
}

function saveRooms(rooms: readonly TripRoom[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  } catch {
    /* Storage full or unavailable — degrade silently. */
  }
}

function updateRoom(roomId: string, updater: (room: TripRoom) => TripRoom): TripRoom | null {
  const rooms = [...loadRooms()];
  const index = rooms.findIndex((r) => r.id === roomId);
  if (index === -1) return null;

  const updated = updater(rooms[index]);
  rooms[index] = updated;
  saveRooms(rooms);
  return updated;
}

/* ── ID generation ─────────────────────────────────────────── */

function generateId(): string {
  return `room_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function generateMemberId(): string {
  return `mem_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

/* ── Public API ────────────────────────────────────────────── */

/** Create a new mock trip room with the current user as host. */
export function createMockTripRoom(hostName: string): TripRoom {
  const roomId = generateId();
  const hostMember: TripMember = {
    id: generateMemberId(),
    displayName: hostName,
    emoji: getMemberEmoji(0),
    isHost: true,
    preferences: null,
    joinedAt: Date.now(),
  };

  const room: TripRoom = {
    id: roomId,
    name: `${hostName}'s trip`,
    createdAt: Date.now(),
    status: "draft",
    members: [hostMember],
    votes: [],
  };

  const rooms = [...loadRooms(), room];
  saveRooms(rooms);
  return room;
}

/** Add a mock member to a room. */
export function addMockMember(roomId: string, displayName: string): TripRoom | null {
  return updateRoom(roomId, (room) => {
    const index = room.members.length;
    const member: TripMember = {
      id: generateMemberId(),
      displayName,
      emoji: getMemberEmoji(index),
      isHost: false,
      preferences: null,
      joinedAt: Date.now(),
    };
    return { ...room, members: [...room.members, member] };
  });
}

/** Update preferences for a member. */
export function updateMockPreferences(
  roomId: string,
  memberId: string,
  preferences: TripPreference,
): TripRoom | null {
  return updateRoom(roomId, (room) => ({
    ...room,
    status: room.status === "draft" ? "collecting" : room.status,
    members: room.members.map((m) =>
      m.id === memberId ? { ...m, preferences } : m,
    ),
  }));
}

/** Add a vote from a member. */
export function addMockVote(
  roomId: string,
  memberId: string,
  destinationId: string,
  score: -1 | 0 | 1,
): TripRoom | null {
  return updateRoom(roomId, (room) => {
    const vote: GroupVote = {
      memberId,
      destinationId,
      score,
      votedAt: Date.now(),
    };
    return {
      ...room,
      status: room.status === "collecting" ? "voting" : room.status,
      votes: [...room.votes, vote],
    };
  });
}

/** Get a room by ID. */
export function getMockRoom(roomId: string): TripRoom | null {
  return loadRooms().find((r) => r.id === roomId) ?? null;
}

/** Get all rooms. */
export function getAllMockRooms(): readonly TripRoom[] {
  return loadRooms();
}

/** Delete a room. */
export function deleteMockRoom(roomId: string): void {
  const rooms = loadRooms().filter((r) => r.id !== roomId);
  saveRooms(rooms);
}

/* ── Mock invite link ──────────────────────────────────────── */

/**
 * Generate a fake shareable invite link.
 *
 * In production this would hit a backend to create a unique
 * invite token. For now it builds a URL with the room ID.
 */
export function getMockInviteLink(roomId: string): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}?join=${encodeURIComponent(roomId)}`;
}

/* ── Group preference matching ─────────────────────────────── */

/**
 * Calculate how well each destination matches the group's
 * combined preferences. Returns sorted by match score (desc).
 *
 * This is a simplified heuristic — a real implementation would
 * use weighted scoring, hard constraints, and possibly ML.
 */
export function calculateMockGroupMatch(
  destinations: readonly Destination[],
  members: readonly TripMember[],
): readonly GroupDestinationMatch[] {
  const prefs = members
    .map((m) => m.preferences)
    .filter((p): p is TripPreference => p !== null);

  if (prefs.length === 0) {
    return destinations.slice(0, 5).map((d) => ({
      destinationId: d.id,
      destinationName: d.name,
      matchScore: 50,
      matchReasons: ["No preferences set yet"],
      conflicts: [],
    }));
  }

  return destinations
    .map((dest) => scoreDestination(dest, prefs))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
}

/* ── Scoring helpers ───────────────────────────────────────── */

function scoreDestination(
  dest: Destination,
  prefs: readonly TripPreference[],
): GroupDestinationMatch {
  let score = 50;
  const reasons: string[] = [];
  const conflicts: string[] = [];

  /* Continent match */
  const wantedContinents = prefs.flatMap((p) => p.continents);
  if (wantedContinents.length > 0) {
    if (wantedContinents.includes(dest.continent)) {
      score += 15;
      reasons.push("Continent matches group preference");
    } else {
      score -= 10;
      conflicts.push("Outside preferred continents");
    }
  }

  /* Category / vibe match */
  const vibeLower = dest.vibe.toLowerCase();
  const categoryHits = prefs.filter((p) =>
    p.categories.some((c) => vibeLower.includes(c)),
  );
  if (categoryHits.length > 0) {
    const ratio = categoryHits.length / prefs.length;
    score += Math.round(ratio * 20);
    reasons.push("Vibe matches group categories");
  }

  /* Budget alignment (simple majority) */
  const budgetCounts: Record<string, number> = {};
  for (const p of prefs) {
    budgetCounts[p.budget] = (budgetCounts[p.budget] ?? 0) + 1;
  }
  const dominantBudget = Object.entries(budgetCounts).sort((a, b) => b[1] - a[1])[0];
  if (dominantBudget) {
    const tierMap: Record<string, string[]> = {
      budget: ["curated"],
      moderate: ["curated", "first-class"],
      luxury: ["first-class", "exclusive"],
    };
    const tiers = tierMap[dominantBudget[0]] ?? [];
    if (tiers.includes(dest.tier)) {
      score += 10;
      reasons.push("Fits group budget");
    } else {
      score -= 5;
      conflicts.push("May not fit group budget");
    }
  }

  /* Family-friendly preference */
  const familyCount = prefs.filter((p) => p.familyFriendly).length;
  if (familyCount > prefs.length / 2) {
    /* Penalize adventure-heavy destinations slightly */
    if (vibeLower.includes("adventure") || vibeLower.includes("party")) {
      score -= 5;
      conflicts.push("Some members prefer family-friendly");
    }
  }

  /* Already visited exclusion */
  const visited = new Set(prefs.flatMap((p) => p.alreadyVisited));
  if (visited.has(dest.id)) {
    score -= 20;
    conflicts.push("Some members have already visited");
  }

  return {
    destinationId: dest.id,
    destinationName: dest.name,
    matchScore: Math.max(0, Math.min(100, score)),
    matchReasons: reasons.length > 0 ? reasons : ["General match"],
    conflicts,
  };
}
