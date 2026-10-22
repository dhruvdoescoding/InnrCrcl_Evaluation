# Feature: Social Feed & Community — Member 2

**Branch:** `feature/feed-social`  
**Owner:** `[MEMBER B]` — replace with real name

## What lives here

| Path | Purpose |
|---|---|
| `components/PostCard.tsx` | Single post display — upvote/downvote, report dialog |
| `components/CreatePostModal.tsx` | New post dialog — tab picker, 500-char content, Firestore write |

## `Post` type (exported from PostCard.tsx)

```ts
export interface Post {
  postId:        string;
  authorAlias:   string;
  authorUid:     string;
  content:       string;
  tab:           string;         // "hot" | "memes" | "tea" | "confessions" | "nerd" | "stories"
  upvotes:       number;
  downvotes:     number;
  commentCount:  number;
  isAnonymous:   boolean;
  isFlagged:     boolean;
  isPostOfDay:   boolean;
  keyword:       string | null;
  mediaURL:      string | null;
  collegeDomain: string;
  createdAt:     { seconds: number } | null;
  expiresAt:     { seconds: number } | null;
}
```

Imported by: `src/app/feed/page.tsx`, `src/app/profile/me/page.tsx`  
Do not remove or rename exported fields without coordinating with Member 1 (profile).

## Pages owned (in `src/app/`, cannot move)

| Route | File |
|---|---|
| `/feed` | `src/app/feed/page.tsx` |
| `/friends` | `src/app/friends/page.tsx` |

## API routes owned

| Endpoint | File |
|---|---|
| `GET /api/feed/post-of-day` | `src/app/api/feed/post-of-day/route.ts` |

## Firestore collections touched

| Collection | Operations |
|---|---|
| `posts` | read (getDocs), write (addDoc via CreatePostModal) |
| `posts/{id}/votes` | read (getDoc), write (setDoc, deleteDoc) |

## Shared components used (do not own, coordinate before changes)

- `src/components/BottomNav.tsx` — rendered in feed page
- `src/components/FloatingOrbs.tsx` — decorative background
- `src/components/ui/tabs.tsx` — tab navigation in feed

## Shared infrastructure used (do not modify)

- `src/lib/firebase.ts` — `db` object
- `src/features/auth/hooks/useAuth.ts` — `useAuth()` used in PostCard
