/**
 * authService.ts — Client-side service for authentication API calls.
 *
 * Owned by: Member 2 (feature/auth-chat)
 * Module:   src/modules/auth-chat/services/
 *
 * Wraps the fetch calls to /api/auth/* so that page components
 * stay focused on UI rendering and this file owns all network contracts.
 *
 * Usage:
 *   import { verifyDomain, completeSignup }
 *     from "@/modules/auth-chat/services/authService";
 */

import type {
  VerifyDomainRequest,
  VerifyDomainResponse,
  CompleteSignupRequest,
  CompleteSignupResponse,
} from "../types";

// ─── Domain verification ──────────────────────────────────────────────────────

/**
 * POST /api/auth/verify-domain
 * Checks whether the given email belongs to a recognised college domain.
 * Returns the pre-assigned alias and collegeDomain if allowed.
 */
export async function verifyDomain(
  payload: VerifyDomainRequest
): Promise<VerifyDomainResponse> {
  const res = await fetch("/api/auth/verify-domain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { allowed: false, error: data.error ?? "Verification failed" };
  }

  return data as VerifyDomainResponse;
}

// ─── Signup completion ────────────────────────────────────────────────────────

/**
 * POST /api/auth/complete-signup
 * Creates the Firebase Auth user account and writes the Firestore user doc.
 * Called after domain verification passes (Step 1 → Step 2 transition in signup).
 */
export async function completeSignup(
  payload: CompleteSignupRequest
): Promise<CompleteSignupResponse> {
  const res = await fetch("/api/auth/complete-signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { error: data.error ?? "Signup failed" };
  }

  return data as CompleteSignupResponse;
}
