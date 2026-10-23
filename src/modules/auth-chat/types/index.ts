/**
 * types/index.ts — Shared type definitions for the auth-chat module.
 *
 * Owned by: Member 2 (feature/auth-chat)
 * Module:   src/modules/auth-chat/
 *
 * Export all auth and chat types from this barrel file.
 * Consumers: src/app/chat/, src/app/login/, src/app/signup/,
 *            src/app/api/auth/, src/app/api/chat/
 */

// ─── Authentication ───────────────────────────────────────────────────────────

/** Payload sent to POST /api/auth/verify-domain */
export interface VerifyDomainRequest {
  email: string;
}

/** Response from POST /api/auth/verify-domain */
export interface VerifyDomainResponse {
  allowed: boolean;
  collegeDomain?: string;
  alias?: string;
  error?: string;
}

/** Payload sent to POST /api/auth/complete-signup */
export interface CompleteSignupRequest {
  email: string;
  password: string;
  realName: string;
  department: string;
  year: string;
  alias: string;
  collegeDomain: string;
}

/** Response from POST /api/auth/complete-signup */
export interface CompleteSignupResponse {
  uid?: string;
  error?: string;
}

// ─── Chat matching ────────────────────────────────────────────────────────────

/** Match type used in the waiting pool */
export type MatchType = "random" | "keyword";

/** Status returned by POST /api/chat/find-or-create */
export type MatchStatus = "matched" | "waiting";

/** Payload for POST /api/chat/find-or-create */
export interface FindOrCreateRequest {
  uid: string;
  collegeDomain: string;
  matchType: MatchType;
  keyword?: string;
}

/** Response from POST /api/chat/find-or-create */
export interface FindOrCreateResponse {
  status: MatchStatus;
  chatId: string | null;
  error?: string;
}

/** Payload for DELETE /api/chat/find-or-create (cancel waiting) */
export interface CancelWaitingRequest {
  uid: string;
}

// ─── Identity reveal ──────────────────────────────────────────────────────────

/** Payload for POST /api/chat/reveal-request */
export interface RevealRequestPayload {
  chatId: string;
  uid: string;
}

/** Status returned by POST /api/chat/reveal-request */
export type RevealStatus = "revealed" | "waiting_for_other";

/** Response from POST /api/chat/reveal-request */
export interface RevealRequestResponse {
  status: RevealStatus;
  error?: string;
}

// ─── Firestore chat document shape (client-readable fields) ──────────────────

export interface ChatDoc {
  participants: string[];
  participantAliases: Record<string, string>;
  status: "active" | "revealed" | "closed";
  matchType: MatchType;
  keyword?: string | null;
  revealRequests?: Record<string, boolean>;
  realNames?: Record<string, string>;
  createdAt: { seconds: number } | null;
  lastMessage?: string | null;
  lastMessageAt?: { seconds: number } | null;
}

/** A single chat message stored in chats/{chatId}/messages */
export interface ChatMessage {
  id: string;
  senderUid: string;
  content: string;
  type: "text" | "system";
  readBy: string[];
  createdAt: { seconds: number; nanoseconds: number } | null;
}
