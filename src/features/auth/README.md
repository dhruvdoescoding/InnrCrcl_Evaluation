# Feature: Authentication & User Profiles — Member 1

**Branch:** `feature/auth-profile`  
**Owner:** `[MEMBER A]` — replace with real name

## What lives here

| Path | Purpose |
|---|---|
| `hooks/useAuth.ts` | `onAuthStateChanged` subscriber — returns `{ user, loading }` |

## Pages owned (in `src/app/`, cannot move — App Router constraint)

| Route | File |
|---|---|
| `/login` | `src/app/login/page.tsx` |
| `/signup` | `src/app/signup/page.tsx` |
| `/auth/callback` | `src/app/auth/callback/page.tsx` |
| `/profile/me` | `src/app/profile/me/page.tsx` |

## API routes owned (in `src/app/api/auth/`)

| Endpoint | File |
|---|---|
| `POST /api/auth/verify-domain` | `src/app/api/auth/verify-domain/route.ts` |
| `POST /api/auth/complete-signup` | `src/app/api/auth/complete-signup/route.ts` |

## `useAuth` contract

```ts
import { useAuth } from "@/features/auth/hooks/useAuth";
const { user, loading } = useAuth();
// user: firebase/auth User | null
// loading: boolean — true until auth state is known
```

Imported by: `src/features/feed/components/PostCard.tsx`  
Do not change the return shape without coordinating with Member 2.

## Shared infrastructure used (do not modify)

- `src/lib/firebase.ts` — `auth` object
- `src/lib/firebase-admin.ts` — used in API routes only
- `src/app/layout.tsx` — root shell (locked)
