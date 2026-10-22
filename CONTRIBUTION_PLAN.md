# INNR-CRCL — Team Contribution Plan

> **Status:** Baseline established · Branches created · Awaiting team member assignment  
> **Baseline commit:** `6320554` on `main`  
> **Created:** 2026-10-22

---

## Repository Overview

INNR-CRCL is a Next.js 14 (App Router) college-exclusive anonymous social platform backed by Firebase.

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, `src/` layout) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui components |
| Auth | Firebase Authentication (client SDK) |
| Database | Cloud Firestore (client SDK + Admin SDK) |
| Storage | Firebase Storage |
| Server auth | Firebase Admin SDK (server-only) |
| AI | OpenAI SDK |
| Animation | Framer Motion |
| State | Zustand |
| Deployment | Netlify |

---

## Verified Feature-to-File Map

> Produced by inspecting every source file. Reflects actual code state.

### Pages

| Route | File | Feature |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing / splash |
| `/login` | `src/app/login/page.tsx` | Login |
| `/signup` | `src/app/signup/page.tsx` | Registration + domain verify |
| `/auth/callback` | `src/app/auth/callback/page.tsx` | Post-auth redirect |
| `/profile/me` | `src/app/profile/me/page.tsx` | User profile |
| `/feed` | `src/app/feed/page.tsx` | Social feed |
| `/friends` | `src/app/friends/page.tsx` | Friends list |
| `/chat` | `src/app/chat/page.tsx` | Chat list |
| `/chat/[id]` | `src/app/chat/[id]/page.tsx` | Individual chat |
| `/chat/support` | `src/app/chat/support/page.tsx` | Support chat |
| `/admin` | `src/app/admin/page.tsx` | Admin dashboard |
| `*` | `src/app/not-found.tsx` | 404 |

### API Routes

| Endpoint | File | Workstream |
|---|---|---|
| `POST /api/auth/verify-domain` | `src/app/api/auth/verify-domain/route.ts` | A |
| `POST /api/auth/complete-signup` | `src/app/api/auth/complete-signup/route.ts` | A |
| `GET /api/feed/post-of-day` | `src/app/api/feed/post-of-day/route.ts` | B |
| `POST /api/chat/find-or-create` | `src/app/api/chat/find-or-create/route.ts` | C |
| `POST /api/chat/reveal-request` | `src/app/api/chat/reveal-request/route.ts` | C |
| `POST /api/moderation/report` | `src/app/api/moderation/report/route.ts` | C |
| `POST /api/admin/resolve-report` | `src/app/api/admin/resolve-report/route.ts` | C |

### Components

| File | Used by | Primary Owner |
|---|---|---|
| `src/components/PostCard.tsx` | feed, profile/me | B |
| `src/components/CreatePostModal.tsx` | feed | B |
| `src/components/BottomNav.tsx` | feed, friends, chat, profile/me | B (coordinate with A/C) |
| `src/components/FloatingOrbs.tsx` | all pages | Shared |
| `src/components/SplashScreen.tsx` | landing | Shared |
| `src/components/ui/button.tsx` | various | Shared primitive |
| `src/components/ui/dialog.tsx` | various | Shared primitive |
| `src/components/ui/tabs.tsx` | feed | B |

### Lib / Infrastructure

| File | Purpose | Owner |
|---|---|---|
| `src/lib/firebase.ts` | Firebase client SDK | LOCKED — all |
| `src/lib/firebase-admin.ts` | Firebase Admin SDK | LOCKED — all |
| `src/lib/useAuth.ts` | Auth state hook | A |
| `src/lib/constants.ts` | App-wide constants | Coordinate |
| `src/lib/utils.ts` | cn() helper | Shared |
| `src/app/layout.tsx` | Root HTML shell | LOCKED — all |
| `src/app/globals.css` | Global styles | Coordinate |
| `package.json` | Dependencies | LOCKED — PR required |
| `firestore.rules` | Security Rules | LOCKED — PR required |

---

## Workstream Assignments

Replace `[MEMBER A]`, `[MEMBER B]`, `[MEMBER C]` with actual names.

---

### Workstream A — Authentication & User Profiles

| Field | Value |
|---|---|
| Team Member | `[MEMBER A]` |
| Branch | `feature/auth-profile` |
| Checkout | `git checkout feature/auth-profile` |

**Owned pages:** `/login`, `/signup`, `/auth/callback`, `/profile/me`

**Owned API routes:** `/api/auth/verify-domain`, `/api/auth/complete-signup`

**Owned lib:** `src/lib/useAuth.ts`

**Shared files requiring coordination:** `BottomNav.tsx` (B owns), `firebase.ts` (locked), `layout.tsx` (locked)

#### Implementation Tasks

- [ ] Review login flow and document how Firebase Auth is used
- [ ] Review domain-verification logic in `verify-domain/route.ts`
- [ ] Review account-completion flow in `complete-signup/route.ts`
- [ ] Review auth callback redirect logic
- [ ] Review user profile data model (Firestore `users` collection)
- [ ] Add field-level validation error messages to signup form
- [ ] Add loading skeleton to profile page while data loads
- [ ] Add a "Sign out" confirmation dialog
- [ ] Write inline comments explaining the auth flow
- [ ] Write `TESTING_AUTH.md` with manual test steps

#### Acceptance Criteria

- College email registration + domain check works
- Auth callback redirects correctly
- Profile page shows alias, post count, recent posts
- Logout clears session

#### Actual Work Completed

| Date | File | Change | Commit |
|---|---|---|---|
| — | — | — | — |

---

### Workstream B — Social Feed & Community

| Field | Value |
|---|---|
| Team Member | `[MEMBER B]` |
| Branch | `feature/feed-social` |
| Checkout | `git checkout feature/feed-social` |

**Owned pages:** `/feed`, `/friends`

**Owned API routes:** `/api/feed/post-of-day`

**Owned components:** `PostCard.tsx`, `CreatePostModal.tsx`, `BottomNav.tsx`

**Shared files requiring coordination:** `useAuth.ts` (A owns), `firebase.ts` (locked), `constants.ts`

#### Implementation Tasks

- [ ] Review feed data model (Firestore `posts` collection + `comments` subcollection)
- [ ] Review Post-of-the-Day logic in `post-of-day/route.ts`
- [ ] Review PostCard — like, comment, report interactions
- [ ] Review CreatePostModal — character limit enforcement, submission
- [ ] Review friends list and connection model
- [ ] Review BottomNav active state logic
- [ ] Add character counter to CreatePostModal (red when near 500 chars)
- [ ] Add empty-state message when no posts exist
- [ ] Add loading skeletons to PostCard while feed fetches
- [ ] Write inline comments on feed data-fetch logic
- [ ] Write `TESTING_FEED.md` with manual test steps

#### Acceptance Criteria

- Feed renders posts in reverse-chronological order
- CreatePostModal enforces MAX_POST_LENGTH (500 chars)
- Like/unlike toggles without page reload
- Comments render and submit correctly
- Post-of-the-Day returns one post per day
- Friends page lists mutual connections

#### Actual Work Completed

| Date | File | Change | Commit |
|---|---|---|---|
| — | — | — | — |

---

### Workstream C — Chat, Support & Moderation

| Field | Value |
|---|---|
| Team Member | `[MEMBER C]` |
| Branch | `feature/chat-moderation` |
| Checkout | `git checkout feature/chat-moderation` |

**Owned pages:** `/chat`, `/chat/[id]`, `/chat/support`, `/admin`

**Owned API routes:** `/api/chat/find-or-create`, `/api/chat/reveal-request`, `/api/moderation/report`, `/api/admin/resolve-report`

**Owned constants:** `CRISIS_KEYWORDS`, `MAX_MESSAGE_LENGTH`, `CHAT_MATCH_POLL_INTERVAL`, `REVEAL_TIMEOUT_MINUTES`

**Shared files requiring coordination:** `BottomNav.tsx` (B owns), `firebase.ts` (locked), `constants.ts`

#### Implementation Tasks

- [ ] Review chat matching flow (poll-based, `find-or-create`)
- [ ] Review identity-reveal request flow (`reveal-request`)
- [ ] Review crisis keyword detection in `/chat/[id]` (client-side only)
- [ ] Review report submission flow
- [ ] Review admin dashboard — list + resolve reports
- [ ] Review support chat page
- [ ] Add timeout message if no chat match found after 60 seconds
- [ ] Improve crisis banner UI (add helpline link placeholder)
- [ ] Add confirmation dialog before submitting reveal request
- [ ] Write inline comments on reveal-request flow
- [ ] Write `TESTING_CHAT.md` with manual test steps

#### Acceptance Criteria

- Two users match and can send messages in real-time
- Crisis keywords trigger the in-page banner (never logged server-side)
- Reveal request created with 5-minute TTL
- Reports appear in admin dashboard
- Admin can resolve/dismiss reports

#### Actual Work Completed

| Date | File | Change | Commit |
|---|---|---|---|
| — | — | — | — |

---

## Shared Files — Change-Control Rules

| File | Rule |
|---|---|
| `src/lib/firebase.ts` | Never modify — breaks all workstreams |
| `src/lib/firebase-admin.ts` | Never modify — server credential handling |
| `src/app/layout.tsx` | Full team approval required |
| `src/app/globals.css` | Coordinate before changing |
| `src/components/BottomNav.tsx` | B is primary owner; A and C need B sign-off |
| `src/components/FloatingOrbs.tsx` | Low-risk; still coordinate |
| `package.json` / `package-lock.json` | Full team approval — affects everyone |
| `firestore.rules` | Full team approval — security-critical |
| `next.config.mjs` | Full team approval |
| `tailwind.config.ts` | Coordinate to avoid styling conflicts |
| `src/lib/constants.ts` | Coordinate additions — multiple owners read it |

---

## Git Workflow

### Branch Map

```
main  (integration baseline)
  ├── feature/auth-profile      → [MEMBER A]
  ├── feature/feed-social       → [MEMBER B]
  └── feature/chat-moderation   → [MEMBER C]
```

### Daily Workflow

```bash
git checkout feature/<your-branch>
git fetch origin
git rebase origin/main
# ... make changes ...
git add <specific files>
git commit -m "feat(scope): description"
git push origin feature/<your-branch>
```

### Commit Message Convention

```
<type>(<scope>): <description>

Types: feat, fix, refactor, docs, test, chore
Scopes: auth, feed, chat, admin, shared

Examples:
  feat(auth): add inline validation to signup form
  fix(chat): handle timeout in find-or-create polling
  docs(feed): comment the post-of-day selection algorithm
```

### Pull Request Rules

1. PR from feature branch → `main`
2. Describe what was done and how it was tested
3. Tag both other team members as reviewers
4. Wait for at least one approval before merging
5. Run `npm run lint` before requesting review
6. Do not force-push after PR is open

### Hard Rules

- **No fabricated commits** — every commit must have real, reviewable changes
- **No authorship claims on the baseline** — the initial commit belongs to no one
- **No history rewriting** — no `git push --force`
- **No committed secrets** — `.env`, `.env.production`, private keys must stay out of git
- **No self-merging** to `main`

---

## Validation Commands

```bash
npm install       # install deps
npm run lint      # must pass — zero errors
npx tsc --noEmit  # must pass — zero type errors
npm run build     # must complete (may warn about missing env vars — document it)
```

---

## Blockers & Open Decisions

| # | Issue | Owner | Status |
|---|---|---|---|
| 1 | Team member names not assigned yet | All | Open |
| 2 | No Firebase dev project configured | All | Open |
| 3 | `.env.production` is tracked in git — remove if it has real credentials | All | Action required |
| 4 | `server-only` is imported but not in package.json devDeps — verify | All | Verify |
| 5 | No automated test framework configured | All | Decision needed |

### Removing `.env.production` from Git Tracking

```bash
echo ".env.production" >> .gitignore
git rm --cached .env.production
git commit -m "chore: stop tracking .env.production"
```

---

## Contribution Log

| Date | Member | Branch | Files Changed | Description | Commit |
|---|---|---|---|---|---|
| 2026-10-22 | (Baseline — no individual author) | main | 139 files | Initial commit of full existing codebase | `6320554` |

---

*Last updated: 2026-10-22*
