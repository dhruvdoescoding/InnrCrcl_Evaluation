# Feature: Chat, Support & Moderation — Member 3

**Branch:** `feature/chat-moderation`  
**Owner:** `[MEMBER C]` — replace with real name

## Pages owned (in `src/app/`, cannot move)

| Route | File |
|---|---|
| `/chat` | `src/app/chat/page.tsx` |
| `/chat/[id]` | `src/app/chat/[id]/page.tsx` |
| `/chat/support` | `src/app/chat/support/page.tsx` |
| `/admin` | `src/app/admin/page.tsx` |

## API routes owned

| Endpoint | File | Description |
|---|---|---|
| `POST /api/chat/find-or-create` | `route.ts` | Poll-based chat matching + waiting pool |
| `DELETE /api/chat/find-or-create` | same route | Cancel waiting (remove from pool) |
| `POST /api/chat/reveal-request` | `route.ts` | Mutual identity-reveal handshake |
| `POST /api/moderation/report` | `route.ts` | Submit content report (with OpenAI check) |
| `POST /api/admin/resolve-report` | `route.ts` | Admin action: remove / approve / warn / ban |

## Firestore collections touched

| Collection | Operations |
|---|---|
| `waitingPool` | read, write, delete (matching) |
| `chats` | read, write (create chat, update reveal status) |
| `chats/{id}/messages` | read, write (real-time listener in `/chat/[id]`) |
| `reports` | write (report), read + update (admin resolve) |
| `users` | read (admin check), update (ban, warn) |
| `friendships` | write (after mutual reveal) |

## Key constants owned (from `src/lib/constants.ts`)

```ts
CRISIS_KEYWORDS       // client-side only — triggers crisis banner in /chat/[id]
MAX_MESSAGE_LENGTH    // 1000 chars
CHAT_MATCH_POLL_INTERVAL // 3000ms — polling interval in matching page
REVEAL_TIMEOUT_MINUTES   // 5 min — auto-expiry of reveal requests
```

## Shared components used (coordinate before changes)

- `src/components/BottomNav.tsx` — rendered in `/chat` page (B is primary owner)
- `src/components/FloatingOrbs.tsx` — decorative background

## Shared infrastructure used (do not modify)

- `src/lib/firebase.ts` — `auth`, `db` objects
- `src/lib/firebase-admin.ts` — used in all API routes
- `src/lib/constants.ts` — CRISIS_KEYWORDS et al.

## Admin access control

`/api/admin/resolve-report` verifies `users/{adminUid}.role === "admin"` via Admin SDK.  
The admin promotion script is at `scripts/make-admin.js`.  
Do not bypass this check.
