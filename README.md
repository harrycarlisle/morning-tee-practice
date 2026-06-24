# Morning Tee Practice

Standalone frontend MVP for `practice.morningtee.com`.

This is separate from LifeOS and separate from `morning-tee-radar-feed`. The MVP keeps all state local and does not connect to Beehiiv, Supabase, LifeOS, or any external runtime.

## What It Does

- Landing hub with Putting available.
- Chipping, Approach, and Driving are coming soon.
- Putting starts immediately with a 20-pace, 6-putt task.
- Users tap six finish locations on a top-down green.
- Finish markers are draggable.
- Results show inside-target count and main miss pattern.
- A simple progress path unlocks Round 2 after Round 1.

## Tech

- Vite
- React
- Local component state
- CSS-drawn visuals and motion

Key files:

- `src/components/PracticeHub.jsx`
- `src/components/DrillTask.jsx`
- `src/components/GreenTapMap.jsx`
- `src/components/ResultsCard.jsx`
- `src/components/ProgressPath.jsx`
- `src/utils/scoring.js`

## Local Setup

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Validate

```bash
npm run lint
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploy Notes

This app should be hosted as its own frontend app, likely on Vercel or Netlify.

Suggested setup:

- Project root: `morning-tee-practice`
- Build command: `npm run build`
- Output directory: `dist`
- Production domain later: `practice.morningtee.com`

Beehiiv should link to this app or embed it later, but Beehiiv custom HTML should not be required for the core practice flow.

## Supabase Later

Do not add Supabase until the MVP flow is working and validated.

When ready, keep Supabase behind a small data layer, for example:

- `src/data/practiceRounds.js`
- `saveRound(result, markers)`
- `listRounds(userId)`

Likely future tables:

- `profiles`
- `practice_rounds`
- `practice_markers`
- `practice_progress`

Keep the current local state path available for offline-first testing and demos.
