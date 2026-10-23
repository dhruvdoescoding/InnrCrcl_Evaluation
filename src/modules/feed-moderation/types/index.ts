/**
 * types/index.ts — Shared type definitions for the feed-moderation module.
 *
 * Owned by: Member 3 (feature/feed-moderation)
 * Module:   src/modules/feed-moderation/
 *
 * These types define the data contracts for posts, reports, and
 * moderation actions used across API routes, components, and services.
 */

// ─── Post types ───────────────────────────────────────────────────────────────

/** Tab categories available on the feed */
export type FeedTab = "hot" | "memes" | "tea" | "confessions" | "nerd" | "stories";

/**
 * Post document shape as read from Firestore and consumed by UI components.
 * This is the canonical export — PostCard re-exports it for convenience.
 */
export interface Post {
  postId: string;
  authorAlias: string;
  authorUid: string;
  content: string;
  tab: FeedTab;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isAnonymous: boolean;
  isFlagged: boolean;
  isPostOfDay: boolean;
  keyword: string | null;
  mediaURL: string | null;
  collegeDomain: string;
  createdAt: { seconds: number } | null;
  expiresAt: { seconds: number } | null;
}

/** Props accepted by CreatePostModal */
export interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  authorUid: string;
  authorAlias: string;
  collegeDomain: string;
  defaultTab?: FeedTab;
}

// ─── Post-of-day API ──────────────────────────────────────────────────────────

/** Response from GET /api/feed/post-of-day */
export interface PostOfDayResponse {
  post: Post | null;
}

// ─── Moderation / Reporting ───────────────────────────────────────────────────

/** Target types that can be reported */
export type ReportTargetType = "post" | "message" | "user";

/** Reason codes for content reports */
export type ReportReason =
  | "harassment"
  | "spam"
  | "hate_speech"
  | "misinformation"
  | "explicit_content"
  | "other";

/** Payload for POST /api/moderation/report */
export interface ReportPayload {
  reportedBy: string;
  targetType: ReportTargetType;
  targetId: string;
  targetContent?: string;
  reason: ReportReason;
}

/** Response from POST /api/moderation/report */
export interface ReportResponse {
  reportId: string;
  autoHidden: boolean;
  error?: string;
}

// ─── Admin / resolve ─────────────────────────────────────────────────────────

/** Actions an admin can take on a report */
export type ResolveAction = "approve" | "remove" | "warn" | "ban";

/** Payload for POST /api/admin/resolve-report */
export interface ResolveReportPayload {
  reportId: string;
  action: ResolveAction;
  adminUid: string;
}

/** Response from POST /api/admin/resolve-report */
export interface ResolveReportResponse {
  success: boolean;
  error?: string;
}

/** Firestore report document shape as read by the admin page */
export interface ReportDoc {
  id: string;
  reportedBy: string;
  targetType: ReportTargetType;
  targetId: string;
  targetContent: string;
  reason: string;
  status: "pending" | "pending_manual" | "reviewed";
  aiAutoHide: boolean;
  aiScore: Record<string, number> | null;
  reviewedBy: string | null;
  reviewedAt: { seconds: number } | null;
  createdAt: { seconds: number } | null;
}
