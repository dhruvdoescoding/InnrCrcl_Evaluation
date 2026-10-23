# INNR-CRCL — Contribution Guide

> Three members. One repository. Three modules. One working application.

---

## Project Architecture Overview

```
INNR-CRCL/
├── src/
│   ├── app/                        # Next.js App Router — route entry points
│   │   ├── page.tsx                # Landing page (M1 owns)
│   │   ├── layout.tsx              # Root shell — SHARED, locked
│   │   ├── globals.css             # Global styles — SHARED (M1 primary)
│   │   ├── not-found.tsx           # 404 — SHARED
│   │   ├── feed/page.tsx           # Feed page (M1 UI, M3 data)
│   │   ├── friends/page.tsx        # Friends page (M1 owns)
│   │   ├── profile/me/page.tsx     # Profile page (M1 owns)
│   │   ├── login/page.tsx          # Login (M2 owns)
│   │   ├── signup/page.tsx         # Signup (M2 owns)
│   │   ├── auth/callback/page.tsx  # Auth callback (M2 owns)
│   │   ├── chat/page.tsx           # Chat list (M2 owns)
│   │   ├── chat/[id]/page.tsx      # Chat detail (M2 owns)
│   │   ├── chat/support/page.tsx   # Support chat (M2 owns)
│   │   ├── admin/page.tsx          # Admin moderation (M3 owns)
│   │   └── api/
│   │       ├── auth/               # Auth APIs (M2 owns)
│   │       ├── chat/               # Chat APIs (M2 owns)
│   │       ├── feed/               # Feed APIs (M3 owns)
│   │       ├── moderation/         # Moderation APIs (M3 owns)
│   │       └── admin/              # Admin APIs (M3 owns)
│   │
│   ├── modules/
│   │   ├── frontend-ui/            # MEMBER 1 — branch: feature/frontend-ui
│   │   │   ├── components/         # Reusable UI components
│   │   │   ├── types/              # UI-layer type definitions
│   │   │   └── README.md
│   │   │
│   │   ├── auth-chat/              # MEMBER 2 — branch: feature/auth-chat
│   │   │   ├── hooks/              # useAuth state hook
│   │   │   ├── services/           # authService, chatService (API wrappers)
│   │   │   ├── types/              # Auth/chat type definitions
│   │   │   ├── utils/              # authErrors mapping
│   │   │   └── README.md
│   │   │
│   │   └── feed-moderation/        # MEMBER 3 — branch: feature/feed-moderation
│   │       ├── components/         # PostCard, CreatePostModal
│   │       ├── services/           # feedService (API wrappers)
│   │       ├── types/              # Post, Report, Admin type definitions
│   │       └── README.md
│   │
│   └── lib/                        # Shared infrastructure — coordinate before changing
│       ├── firebase.ts             # Firebase client SDK singleton (SHARED)
│       ├── firebase-admin.ts       # Firebase Admin SDK — SERVER ONLY (M3 primary)
│       ├── constants.ts            # App-wide constants (SHARED)
│       └── utils.ts                # Tailwind class helper (SHARED)
│
├── CONTRIBUTION_GUIDE.md           # This file
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## File Ownership Map

### Member 1 — Frontend & UI (`feature/frontend-ui`)

**Primary module:** `src/modules/frontend-ui/`

| File | Type | Notes |
|---|---|---|
| `src/modules/frontend-ui/components/BottomNav.tsx` | Module | Bottom navigation bar |
| `src/modules/frontend-ui/components/FloatingOrbs.tsx` | Module | Animated background orbs |
| `src/modules/frontend-ui/components/SplashScreen.tsx` | Module | 4-second launch animation |
| `src/modules/frontend-ui/components/ui/button.tsx` | Module | Radix/CVA button primitive |
| `src/modules/frontend-ui/components/ui/dialog.tsx` | Module | Radix dialog primitive |
| `src/modules/frontend-ui/components/ui/tabs.tsx` | Module | Radix tabs primitive |
| `src/modules/frontend-ui/types/index.ts` | Module | UI prop/type definitions |
| `src/app/page.tsx` | Route entry | Landing page |
| `src/app/feed/page.tsx` | Route entry | Feed page (UI layer; M3 owns data) |
| `src/app/friends/page.tsx` | Route entry | Friends page |
| `src/app/profile/me/page.tsx` | Route entry | User profile page |
| `src/app/globals.css` | Shared (primary) | Global Tailwind + CSS variables |

---

### Member 2 — Authentication & Chat (`feature/auth-chat`)

**Primary module:** `src/modules/auth-chat/`

| File | Type | Notes |
|---|---|---|
| `src/modules/auth-chat/hooks/useAuth.ts` | Module | Firebase auth state hook |
| `src/modules/auth-chat/services/authService.ts` | Module | API wrapper for /api/auth/* |
| `src/modules/auth-chat/services/chatService.ts` | Module | API wrapper for /api/chat/* |
| `src/modules/auth-chat/types/index.ts` | Module | Auth/chat type definitions |
| `src/modules/auth-chat/utils/authErrors.ts` | Module | Firebase error code → message |
| `src/app/login/page.tsx` | Route entry | Login UI |
| `src/app/signup/page.tsx` | Route entry | Signup multi-step UI |
| `src/app/auth/callback/page.tsx` | Route entry | Email link callback |
| `src/app/chat/page.tsx` | Route entry | Chat list + matching |
| `src/app/chat/[id]/page.tsx` | Route entry | Individual chat + reveal |
| `src/app/chat/support/page.tsx` | Route entry | Support chat |
| `src/app/api/auth/verify-domain/route.ts` | API route | College email check |
| `src/app/api/auth/complete-signup/route.ts` | API route | Account creation |
| `src/app/api/chat/find-or-create/route.ts` | API route | Matching + waiting pool |
| `src/app/api/chat/reveal-request/route.ts` | API route | Identity reveal |

---

### Member 3 — Feed, Moderation & Data (`feature/feed-moderation`)

**Primary module:** `src/modules/feed-moderation/`

| File | Type | Notes |
|---|---|---|
| `src/modules/feed-moderation/components/PostCard.tsx` | Module | Post display + report dialog |
| `src/modules/feed-moderation/components/CreatePostModal.tsx` | Module | New post dialog |
| `src/modules/feed-moderation/services/feedService.ts` | Module | API wrappers for feed/moderation/admin |
| `src/modules/feed-moderation/types/index.ts` | Module | Post, Report, Admin types |
| `src/app/admin/page.tsx` | Route entry | Admin moderation queue |
| `src/app/api/feed/post-of-day/route.ts` | API route | Post-of-day query |
| `src/app/api/moderation/report/route.ts` | API route | Content report submission |
| `src/app/api/admin/resolve-report/route.ts` | API route | Admin report resolution |
| `src/lib/firebase-admin.ts` | Shared (primary) | Server-only Admin SDK |
| `src/lib/constants.ts` | Shared (primary) | App-wide constants |

---

## Shared Infrastructure — Change Control

These files are used by multiple modules. **Coordinate via pull-request review before changing them.**

| File | Primary Maintainer | Dependents |
|---|---|---|
| `src/app/layout.tsx` | All (locked — minor changes only) | Every page |
| `src/app/globals.css` | Member 1 | Every page |
| `src/lib/firebase.ts` | Member 2 | M1, M2, M3 pages |
| `src/lib/firebase-admin.ts` | Member 3 | All API routes |
| `src/lib/constants.ts` | Member 3 | chat/[id] page, signup |
| `src/lib/utils.ts` | Any (utility only) | UI components |
| `package.json` / `tsconfig.json` | All (requires group review) | Entire project |

**Rules:**
- Do **not** duplicate `firebase.ts` or `firebase-admin.ts` in your module.
- Do **not** import `firebase-admin.ts` from any client component or page.
- Do **not** change `useAuth`'s `{ user, loading }` return shape without notifying all members.
- Do **not** rename exported fields on `Post` type without coordinating with Member 1 (profile page).

---

## Cross-Module Contracts

### `useAuth` (M2 → M1, M3)
```ts
import { useAuth } from "@/modules/auth-chat/hooks/useAuth";
const { user, loading } = useAuth();
// user: firebase/auth User | null
// loading: boolean
```

### `Post` type (M3 → M1)
```ts
import type { Post } from "@/modules/feed-moderation/types";
// Used by: src/app/feed/page.tsx, src/app/profile/me/page.tsx
```

### `PostCard` component (M3 → M1)
```ts
import PostCard, { type Post } from "@/modules/feed-moderation/components/PostCard";
// Used by: feed/page.tsx, profile/me/page.tsx
```

### `CreatePostModal` (M3 → M1)
```ts
import CreatePostModal from "@/modules/feed-moderation/components/CreatePostModal";
// Used by: feed/page.tsx
```

---

## Git Workflow — Step by Step

### Clone and set up

```bash
git clone <repository-url>
cd INNR-CRCL-main
npm install
cp .env.production .env.local   # Add your own env values
```

### Member 1 — Frontend & UI

```bash
# Switch to your branch
git checkout feature/frontend-ui
git pull origin feature/frontend-ui

# Work in your module
# src/modules/frontend-ui/   ← your primary workspace
# src/app/page.tsx, feed/page.tsx, friends/page.tsx, profile/me/page.tsx

# Run the dev server
npm run dev

# Commit your work
git add src/modules/frontend-ui/ src/app/page.tsx src/app/feed/page.tsx \
        src/app/friends/page.tsx src/app/profile/me/page.tsx
git commit -m "feat(frontend-ui): <describe what you changed>"
git push origin feature/frontend-ui

# Open a PR: feature/frontend-ui → main
```

### Member 2 — Authentication & Chat

```bash
# Switch to your branch
git checkout feature/auth-chat
git pull origin feature/auth-chat

# Work in your module
# src/modules/auth-chat/    ← your primary workspace
# src/app/login/, signup/, auth/, chat/, api/auth/, api/chat/

npm run dev

git add src/modules/auth-chat/ src/app/login/ src/app/signup/ \
        src/app/auth/ src/app/chat/ src/app/api/auth/ src/app/api/chat/
git commit -m "feat(auth-chat): <describe what you changed>"
git push origin feature/auth-chat
```

### Member 3 — Feed, Moderation & Data

```bash
# Switch to your branch
git checkout feature/feed-moderation
git pull origin feature/feed-moderation

# Work in your module
# src/modules/feed-moderation/  ← your primary workspace
# src/app/admin/, api/feed/, api/moderation/, api/admin/

npm run dev

git add src/modules/feed-moderation/ src/app/admin/ \
        src/app/api/feed/ src/app/api/moderation/ src/app/api/admin/
git commit -m "feat(feed-moderation): <describe what you changed>"
git push origin feature/feed-moderation
```

---

## Validation Commands

Run these before opening a PR:

```bash
# Type checking
npx tsc --noEmit

# Lint
npm run lint

# Development build check
npm run build
```

---

## Integration (Merge) Workflow

1. **Member 1** opens PR `feature/frontend-ui → main`. Review + approve.
2. Merge M1. Run `npm run build` on `main`. Confirm OK.
3. **Member 2** rebases `feature/auth-chat` on updated `main`. Opens PR.
4. Review + approve M2. Merge. Run full validation on `main`.
5. **Member 3** rebases `feature/feed-moderation` on updated `main`. Opens PR.
6. Review + approve M3. Merge. Run full validation on `main`.

**Rebase before opening PR:**
```bash
git checkout feature/<your-branch>
git fetch origin
git rebase origin/main
# Resolve any conflicts in your owned files only
git push origin feature/<your-branch> --force-with-lease
```

**Conflict resolution rule:** The member who owns a file resolves conflicts in that file. For shared files, both members must agree on the resolution.

---

## Environment Variables Required

```env
# Firebase Client (public — in .env.local for dev)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (server-only — never expose to client)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# OpenAI (optional — enables AI moderation in /api/moderation/report)
OPENAI_API_KEY=
```

---

## What Existing Code, What's New

| Category | Status |
|---|---|
| `src/app/**` (all route files) | **Existing** — not moved, preserved in-place |
| `src/lib/**` | **Existing** — shared, not duplicated |
| `src/modules/frontend-ui/components/` | **Existing** (moved from earlier refactor) |
| `src/modules/auth-chat/hooks/useAuth.ts` | **Existing** |
| `src/modules/auth-chat/utils/authErrors.ts` | **Existing** |
| `src/modules/feed-moderation/components/` | **Existing** (PostCard, CreatePostModal) |
| `src/modules/*/types/index.ts` | **New** — added in this reorganisation |
| `src/modules/auth-chat/services/` | **New** — authService, chatService |
| `src/modules/feed-moderation/services/` | **New** — feedService |
| `src/modules/frontend-ui/types/` | **New** — UI type definitions |

> Members should focus future implementation on their module folder.
> The route entry points in `src/app/` are maintained in-place as required by Next.js App Router.
