# Module: Authentication & Chat — Member 2

**Branch:** `feature/auth-chat`

## What this module owns

| Path | Description |
|---|---|
| `hooks/useAuth.ts` | Firebase auth state subscriber hook |
| `utils/authErrors.ts` | Firebase error code → user message mapping |

## Pages owned (kept in `src/app/` — Next.js requirement)

- `src/app/login/page.tsx` — sign-in UI
- `src/app/signup/page.tsx` — registration UI
- `src/app/auth/callback/page.tsx` — post-auth redirect handler
- `src/app/chat/page.tsx` — chat list + matching
- `src/app/chat/[id]/page.tsx` — individual chat + reveal
- `src/app/chat/support/page.tsx` — support chat

## API routes owned

- `src/app/api/auth/verify-domain/route.ts`
- `src/app/api/auth/complete-signup/route.ts`
- `src/app/api/chat/find-or-create/route.ts`
- `src/app/api/chat/reveal-request/route.ts`

## Import aliases for this module

```ts
import { useAuth } from "@/modules/auth-chat/hooks/useAuth";
import { authErrorMessage } from "@/modules/auth-chat/utils/authErrors";
```

## useAuth contract (DO NOT change without notifying Member 3)

```ts
useAuth(): { user: User | null; loading: boolean }
```
`PostCard.tsx` (Member 3) depends on this return shape.

## Coordination rules

- `firebase.ts` in `src/lib/` is shared and locked — do not duplicate.
- The `useAuth` return shape is a cross-module contract.
- Chat API contracts (`find-or-create`, `reveal-request`) are called by the chat pages — keep request/response shapes stable.
