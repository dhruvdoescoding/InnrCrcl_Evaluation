# Module: Feed, Moderation & Data — Member 3

**Branch:** `feature/feed-moderation`

## What this module owns

| Path | Description |
|---|---|
| `components/PostCard.tsx` | Post display, upvote/downvote, report dialog |
| `components/CreatePostModal.tsx` | New post creation dialog |

## Pages owned (kept in `src/app/` — Next.js requirement)

- `src/app/admin/page.tsx` — admin moderation dashboard

## API routes owned

- `src/app/api/feed/post-of-day/route.ts`
- `src/app/api/moderation/report/route.ts`
- `src/app/api/admin/resolve-report/route.ts`

## Import aliases for this module

```ts
import PostCard, { type Post } from "@/modules/feed-moderation/components/PostCard";
import CreatePostModal from "@/modules/feed-moderation/components/CreatePostModal";
```

## Post type contract (DO NOT change exported fields without notifying Member 1)

`PostCard.tsx` exports the `Post` interface.
`src/app/feed/page.tsx` (Member 1) and `src/app/profile/me/page.tsx` (Member 1) import it.

## API contract for report route (DO NOT change without notifying Member 2)

```
POST /api/moderation/report
Body: { reportedBy, targetType, targetId, targetContent?, reason }
Response: { reportId, autoHidden }
```
`PostCard.tsx` calls this endpoint directly.

## Shared infra used (do not modify)

- `src/lib/firebase-admin.ts` — server-only Admin SDK, used in all API routes
- `src/lib/constants.ts` — CRISIS_KEYWORDS and other shared constants
- `src/modules/auth-chat/hooks/useAuth` — imported by PostCard for current user
