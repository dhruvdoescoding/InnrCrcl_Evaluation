# INNR-CRCL — GitHub Push & Contribution Workflow

## Repository Setup (one-time, done by any one member)

```bash
# Create a new empty repo on GitHub, then add the remote:
git remote add origin https://github.com/<your-org>/INNR-CRCL.git

# Push all branches and the integration branch
git push -u origin main
git push -u origin feature/auth-profile
git push -u origin feature/feed-social
git push -u origin feature/chat-moderation
```

> Replace `<your-org>` with your actual GitHub username or organization.
> Never include passwords or tokens in commands. Use SSH (`git@github.com:...`)
> or the GitHub CLI (`gh auth login`) for authentication.

---

## Each Member — First-Time Setup

```bash
# Clone the shared repository
git clone https://github.com/<your-org>/INNR-CRCL.git
cd INNR-CRCL

# Install dependencies
npm install

# Copy and fill in the environment file (get values from your team)
cp .env.example .env.local   # or ask a teammate for the values
```

---

## Member 1 — Auth & Profiles (`feature/auth-profile`)

### Daily workflow

```bash
# 1. Make sure you are on your branch
git checkout feature/auth-profile

# 2. Pull the latest main and rebase your branch on top of it
git fetch origin
git rebase origin/main

# 3. Work inside your owned files:
#    src/features/auth/hooks/useAuth.ts
#    src/features/auth/utils/authErrors.ts
#    src/app/login/page.tsx
#    src/app/signup/page.tsx
#    src/app/auth/callback/page.tsx
#    src/app/profile/me/page.tsx
#    src/app/api/auth/verify-domain/route.ts
#    src/app/api/auth/complete-signup/route.ts

# 4. Validate before committing
npm run lint
npx tsc --noEmit

# 5. Stage only your files
git add src/features/auth/ src/app/login/ src/app/signup/ \
        src/app/auth/ src/app/profile/ src/app/api/auth/

# 6. Commit with a scoped message
git commit -m "feat(auth): <what you did>"

# 7. Push
git push origin feature/auth-profile

# 8. Open a Pull Request on GitHub
#    Base: main   ←   Compare: feature/auth-profile
```

### What NOT to touch without team coordination
- `src/lib/firebase.ts` / `firebase-admin.ts` — locked
- `src/features/auth/hooks/useAuth.ts` return shape — Member 2 depends on it
- `src/app/layout.tsx` — full team approval required

---

## Member 2 — Social Feed & Community (`feature/feed-social`)

### Daily workflow

```bash
git checkout feature/feed-social
git fetch origin
git rebase origin/main

# Work inside your owned files:
#    src/features/feed/components/PostCard.tsx
#    src/features/feed/components/CreatePostModal.tsx
#    src/features/feed/TESTING_FEED.md
#    src/app/feed/page.tsx
#    src/app/friends/page.tsx
#    src/app/api/feed/post-of-day/route.ts
#    src/components/BottomNav.tsx  (primary owner — coordinate changes)

npm run lint
npx tsc --noEmit

git add src/features/feed/ src/app/feed/ src/app/friends/ \
        src/app/api/feed/ src/components/BottomNav.tsx
git commit -m "feat(feed): <what you did>"
git push origin feature/feed-social

# Open PR: Base: main  ←  Compare: feature/feed-social
```

### What NOT to touch without team coordination
- `Post` interface exported fields in `PostCard.tsx` — Member 1 (profile/me) imports it
- `/api/moderation/report` request shape — Member 3 owns that route; Member 2 calls it
- `src/lib/firebase.ts` / `firebase-admin.ts` — locked

---

## Member 3 — Chat, Support & Moderation (`feature/chat-moderation`)

### Daily workflow

```bash
git checkout feature/chat-moderation
git fetch origin
git rebase origin/main

# Work inside your owned files:
#    src/app/chat/page.tsx
#    src/app/chat/[id]/page.tsx
#    src/app/chat/support/page.tsx
#    src/app/admin/page.tsx
#    src/app/api/chat/find-or-create/route.ts
#    src/app/api/chat/reveal-request/route.ts
#    src/app/api/moderation/report/route.ts
#    src/app/api/admin/resolve-report/route.ts
#    src/features/chat/TESTING_CHAT.md

npm run lint
npx tsc --noEmit

git add src/app/chat/ src/app/admin/ \
        src/app/api/chat/ src/app/api/moderation/ src/app/api/admin/ \
        src/features/chat/
git commit -m "feat(chat): <what you did>"
git push origin feature/chat-moderation

# Open PR: Base: main  ←  Compare: feature/chat-moderation
```

### What NOT to touch without team coordination
- `/api/moderation/report` request/response shape — PostCard.tsx (Member 2) calls it
- `src/lib/firebase-admin.ts` — locked; all API routes import from here
- Admin role check in `resolve-report/route.ts` — do not remove the `role === "admin"` guard

---

## Integrating a PR into main

```bash
# Reviewer checks out the PR branch to test it locally
git fetch origin
git checkout feature/auth-profile   # (or whichever branch)
npm run lint && npx tsc --noEmit

# If it passes: merge on GitHub (use "Squash and merge" or "Merge commit")
# Then pull main locally
git checkout main
git pull origin main

# Update all other feature branches so they include the merged changes
git checkout feature/feed-social
git rebase origin/main
git push origin feature/feed-social   # may need --force-with-lease after rebase

git checkout feature/chat-moderation
git rebase origin/main
git push origin feature/chat-moderation
```

---

## Handling Conflicts on Shared Files

If two members modified the same file (e.g., `BottomNav.tsx`):

```bash
# On your branch, after rebase hits a conflict:
git status          # shows conflicting files
# Edit the file to resolve — keep BOTH sets of changes
git add src/components/BottomNav.tsx
git rebase --continue
```

**Avoid conflicts by rule:**
- Only Member 2 (primary owner) edits `BottomNav.tsx`
- Other members never edit `src/lib/firebase.ts` or `src/app/layout.tsx`
- New shared constants go through a coordinated PR, not a direct edit

---

## Commit Message Convention

```
feat(auth):   <description>     # Member 1
feat(feed):   <description>     # Member 2
feat(chat):   <description>     # Member 3
fix(auth):    <description>
fix(feed):    <description>
fix(chat):    <description>
docs(auth):   <description>
refactor(feed): <description>
chore(shared):  <description>   # shared infra change (needs team review)
```

---

## Security: Credentials

`.env.production` must NOT be tracked in git.

```bash
# Run once, by any member:
echo ".env.production" >> .gitignore
git rm --cached .env.production
git add .gitignore
git commit -m "chore: stop tracking .env.production"
git push origin main
```

Each member keeps their own `.env.local` (already gitignored by Next.js) with development Firebase credentials.
