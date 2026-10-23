/**
 * chatService.ts — Client-side service for chat matching and reveal API calls.
 *
 * Owned by: Member 2 (feature/auth-chat)
 * Module:   src/modules/auth-chat/services/
 *
 * Wraps the fetch calls to /api/chat/* so that page components
 * contain only UI logic and this file holds all network contracts.
 *
 * Usage:
 *   import { findOrCreateChat, cancelWaiting, requestReveal }
 *     from "@/modules/auth-chat/services/chatService";
 */

import type {
  FindOrCreateRequest,
  FindOrCreateResponse,
  CancelWaitingRequest,
  RevealRequestPayload,
  RevealRequestResponse,
} from "../types";

// ─── Chat matching ────────────────────────────────────────────────────────────

/**
 * POST /api/chat/find-or-create
 * Either matches the user immediately with a waiting peer or places them
 * in the waiting pool.
 */
export async function findOrCreateChat(
  payload: FindOrCreateRequest
): Promise<FindOrCreateResponse> {
  const res = await fetch("/api/chat/find-or-create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { status: "waiting", chatId: null, error: err.error ?? "Request failed" };
  }

  return res.json() as Promise<FindOrCreateResponse>;
}

/**
 * DELETE /api/chat/find-or-create
 * Removes the user from the waiting pool (cancel matching).
 */
export async function cancelWaiting(payload: CancelWaitingRequest): Promise<void> {
  await fetch("/api/chat/find-or-create", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Swallow errors — cancellation is best-effort.
  });
}

// ─── Identity reveal ──────────────────────────────────────────────────────────

/**
 * POST /api/chat/reveal-request
 * Registers this user's identity-reveal consent for the given chat.
 * If the other participant has already consented, both real names are
 * exchanged and a friendship doc is created.
 */
export async function requestReveal(
  payload: RevealRequestPayload
): Promise<RevealRequestResponse> {
  const res = await fetch("/api/chat/reveal-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { status: "waiting_for_other", error: err.error ?? "Request failed" };
  }

  return res.json() as Promise<RevealRequestResponse>;
}
