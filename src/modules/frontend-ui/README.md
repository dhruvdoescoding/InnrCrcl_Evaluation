# Module: Frontend & UI — Member 1

**Branch:** `feature/frontend-ui`

## What this module owns

| Path | Description |
|---|---|
| `components/BottomNav.tsx` | Fixed bottom navigation bar — all 4 tabs |
| `components/FloatingOrbs.tsx` | Ambient background decoration |
| `components/SplashScreen.tsx` | Animated loading screen on landing page |
| `components/ui/button.tsx` | shadcn/ui Button primitive |
| `components/ui/dialog.tsx` | shadcn/ui Dialog/Modal primitive |
| `components/ui/tabs.tsx` | shadcn/ui Tabs primitive |

## Pages owned (kept in `src/app/` — Next.js requirement)

- `src/app/page.tsx` — landing page
- `src/app/feed/page.tsx` — feed presentation layer
- `src/app/friends/page.tsx` — friends list UI
- `src/app/profile/me/page.tsx` — user profile presentation
- `src/app/globals.css` — global Tailwind base styles

## Import alias for this module

```ts
import BottomNav from "@/modules/frontend-ui/components/BottomNav";
import FloatingOrbs from "@/modules/frontend-ui/components/FloatingOrbs";
import { Button } from "@/modules/frontend-ui/components/ui/button";
```

## Coordination rules

- `BottomNav` hrefs (`/feed`, `/chat`, `/friends`, `/profile/me`) — do not change URLs without notifying Members 2 and 3.
- `ui/button`, `ui/dialog`, `ui/tabs` — shadcn primitives; do not modify unless coordinating with all members.
- `globals.css` — coordinate before changing global Tailwind base styles.

## Shared infrastructure (do not modify)

- `src/lib/firebase.ts`, `src/lib/firebase-admin.ts` — locked
- `src/app/layout.tsx` — full team approval required
