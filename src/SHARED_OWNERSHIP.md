# Shared File Ownership

Files in this table are used by more than one workstream.
**Changes require coordination and PR review from all affected members.**

## Shared Components — `src/components/`

| File | Used by | Primary Owner | Change Rule |
|---|---|---|---|
| `BottomNav.tsx` | feed, friends, chat, profile/me | Member 2 (feed) | All three must agree before changes |
| `FloatingOrbs.tsx` | all pages | Decorative — no owner | Low-risk; still notify team |
| `SplashScreen.tsx` | landing (`/`) | Decorative — no owner | Low-risk |
| `ui/button.tsx` | various | shadcn primitive — no owner | Do not modify without team approval |
| `ui/dialog.tsx` | PostCard, CreatePostModal | shadcn primitive | Do not modify |
| `ui/tabs.tsx` | feed | shadcn primitive | Do not modify |

## Shared Infrastructure — `src/lib/`

| File | Purpose | Rule |
|---|---|---|
| `firebase.ts` | Firebase client SDK singleton | **Locked.** Never modify. Breaking this breaks all three workstreams. |
| `firebase-admin.ts` | Firebase Admin SDK (server-only) | **Locked.** Never modify. Contains security-critical credential handling. |
| `constants.ts` | App-wide limits and keyword lists | Coordinate before adding. C owns chat constants; A/B own others. |
| `utils.ts` | `cn()` class-merge helper | No conflicts expected; still notify if touching. |

## App Shell — `src/app/`

| File | Rule |
|---|---|
| `layout.tsx` | **Locked.** Full team approval required. Root HTML shell. |
| `globals.css` | Coordinate before changes. Global Tailwind base styles. |
| `page.tsx` (landing) | Low ownership contention; notify team before changes. |
| `not-found.tsx` | Low ownership contention. |

## Config / Build — root

| File | Rule |
|---|---|
| `package.json` / `package-lock.json` | **Full team approval required.** Adding/removing deps affects everyone. |
| `next.config.mjs` | **Full team approval.** |
| `tailwind.config.ts` | Coordinate before changing. Affects all page styles. |
| `firestore.rules` | **Full team approval.** Security-critical. Test in emulator first. |
| `netlify.toml` | Deployment config — do not change without team sign-off. |
| `.env.production` | **Action required: remove from git tracking.** See CONTRIBUTION_PLAN.md. |

## Cross-Workstream Contract Points

These are the interfaces between modules. Changing them requires the downstream team to update too.

| Contract | Defined in | Used by | What must not change |
|---|---|---|---|
| `useAuth()` return shape | `src/features/auth/hooks/useAuth.ts` | Member 2 (PostCard) | `{ user: User\|null, loading: boolean }` |
| `Post` interface | `src/features/feed/components/PostCard.tsx` | Member 2 (feed), Member 1 (profile/me) | All exported field names and types |
| `/api/moderation/report` request body | `moderation/report/route.ts` | Member 2 (PostCard → submitReport) | `{ reportedBy, targetType, targetId, targetContent, reason }` |
| BottomNav hrefs | `src/components/BottomNav.tsx` | All pages that render it | `/feed`, `/chat`, `/friends`, `/profile/me` — do not change URLs |
