# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Spanish-language SPA for spinal mobility exercises (L5-S1 focused). Personal physiotherapy planner with configurable morning/night sessions, a fixed work-break routine with 50-minute timer, physio-prescribed exercises with video demos (via Google Drive), and favorites.

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **HeroUI v3** (compound component API, Tailwind CSS v4, React Aria)
- **Google OAuth** + **Drive API** for private video streaming
- **Vitest** + **Testing Library** for tests
- **No backend** — auth is client-side (implicit flow), state in localStorage

## Commands

This project uses **pnpm** (not npm). See `.npmrc` for the 24h quarantine policy (`minimum-release-age=1440`); this complements, but does not replace, dependency audits and updates.

```bash
pnpm install --frozen-lockfile --ignore-scripts # Install locked dependencies without lifecycle scripts
pnpm dev           # Start dev server (http://localhost:5173/khiron/)
pnpm build         # TypeScript check + production build
pnpm preview       # Preview production build
pnpm lint          # ESLint
pnpm test          # Run tests once
pnpm test:watch    # Run tests in watch mode
```

## Environment Variables

- `VITE_GOOGLE_CLIENT_ID` — public Google OAuth web client ID (required for media playback). Set in `.env` locally and as a repository Actions variable for deployment. A repository secret with the same name is also accepted. Never put a client secret or access token in a `VITE_*` variable.

## Architecture

```
src/
  data/exercises.ts          # Exercise catalog with Drive IDs, session config, avoid list
  context/
    AppContext.tsx            # Favorites + session config (localStorage-backed)
    AuthContext.tsx           # Google OAuth state (token in memory, not persisted)
  hooks/
    usePersistedState.ts     # Generic localStorage hook
    useTimer.ts              # 50-min countdown timer
    useDriveVideo.ts         # Fetch video from Drive API as blob URL
  components/
    AppHeader.tsx
    ExerciseCard.tsx          # HeroUI Card with favorite toggle
    ExerciseGrid.tsx          # Responsive grid of cards
    ExerciseDetailModal.tsx   # HeroUI Modal with auth gate + Drive video
    VideoPlayer.tsx           # HTML5 video with loading/error states
    WorkTimer.tsx             # 50-min timer with audio alert
    PhysioTab.tsx             # Daily + 3x/week physio exercises + avoid list
    SessionConfigurator.tsx   # Add/remove/reorder exercises in sessions
  test/
    exercises.test.ts        # Exercise data integrity tests
    session-config.test.ts   # Session toggle and reorder logic tests
    useDriveVideo.test.ts    # Drive video hook tests (mocked fetch)
```

## Key Patterns

- Exercise catalog (`exercises.ts`) is separated from session configuration. Sessions reference exercise IDs; users configure which exercises go in morning/night.
- Work exercises are fixed (not user-configurable).
- Videos are stored in Google Drive (private). Exercises have a `driveFileId` field. The `useDriveVideo` hook fetches via Drive API using the OAuth access token and returns a blob URL.
- Auth uses Google OAuth implicit flow. Token lives in React state only (not localStorage). OAuth consent screen is in "testing" mode — only approved test users can log in.
- State updates that depend on previous state must use functional updaters (`updateSessionConfig(prev => ...)`) to avoid stale closures.
- HeroUI v3 uses compound components (`Card.Header`, `Modal.Body`, etc.) — no Provider needed.
- `Tabs.Indicator` goes inside each `Tabs.Tab`, not as a sibling.
- For controlled modals, use `Modal.Backdrop` directly with `isOpen`/`onOpenChange` — don't wrap in `<Modal>`.
- Use `onPress` (not `onClick`) on HeroUI interactive components.
- All UI text is in Spanish.
- Exercise text, notes, and Drive IDs are intentionally public. Media access is enforced by Google Drive permissions, not by hiding UI elements.
- Do not commit private media, original prescription documents, credentials, or temporary design files.
- Deployment uses this repository's GitHub Pages workflow and publishes only `dist/`, with no personal deployment token. Actions are pinned by SHA.
- Keep the `/khiron/` Vite base aligned with the public repository name. See README.md for Pages and OAuth setup.

## Google Cloud Setup

The app requires a Google Cloud project with:
1. Google Drive API enabled
2. OAuth consent screen in "External" + "Testing" mode, with the owner's Google account as test user
3. OAuth 2.0 Client ID (Web application) with authorized JS origins for localhost and the production domain
