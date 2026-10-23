/**
 * feedService.ts — Client-side service for feed and moderation API calls.
 *
 * Owned by: Member 3 (feature/feed-moderation)
 * Module:   src/modules/feed-moderation/services/
 *
 * Wraps fetch calls to /api/feed/* and /api/moderation/* so that page
 * components stay focused on UI and this file owns all network contracts.
 *
 * Usage:
 *   import { fetchPostOfDay, submitReport }
 *     from "@/modules/feed-moderation/services/feedService";
 */

import type {
  PostOfDayResponse,
  ReportPayload,
  ReportResponse,
  ResolveReportPayload,
  ResolveReportResponse,
} from "../types";

// ─── Feed ─────────────────────────────────────────────────────────────────────

/**
 * GET /api/feed/post-of-day?collegeDomain=<domain>
 * Returns the current "Post of the Day" for the given college domain,
 * or null if none is pinned.
 */
export async function fetchPostOfDay(
  collegeDomain: string
): Promise<PostOfDayResponse> {
  const url = `/api/feed/post-of-day?collegeDomain=${encodeURIComponent(collegeDomain)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return { post: null };
    return res.json() as Promise<PostOfDayResponse>;
  } catch {
    return { post: null };
  }
}

// ─── Moderation ───────────────────────────────────────────────────────────────

/**
 * POST /api/moderation/report
 * Submits a content report. Optionally runs an OpenAI moderation check
 * server-side and auto-hides flagged content.
 */
export async function submitReport(
  payload: ReportPayload
): Promise<ReportResponse> {
  const res = await fetch("/api/moderation/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { reportId: "", autoHidden: false, error: data.error ?? "Report failed" };
  }

  return data as ReportResponse;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

/**
 * POST /api/admin/resolve-report
 * Resolves a pending report with an admin action.
 * Requires the caller to be an admin (enforced server-side).
 */
export async function resolveReport(
  payload: ResolveReportPayload
): Promise<ResolveReportResponse> {
  const res = await fetch("/api/admin/resolve-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { success: false, error: data.error ?? "Resolve failed" };
  }

  return data as ResolveReportResponse;
}
