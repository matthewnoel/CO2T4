# CONTEXT

Domain language for CO2T4 (a CO₂-tolerance / box-breathing trainer) and the modules
that carry it. Architecture terms (module, interface, seam, deep/shallow, leverage,
locality) follow the `improve-codebase-architecture` skill's LANGUAGE.md.

## Domain

- **Protocol** — the fixed sequence of steps a session walks: warning → rest → exhale
  test → rest → calibration → box breathing → done.
- **Exhale test** — measuring the user's slowest exhale, in milliseconds.
- **Calibration** — turning a measured exhale into a starting **interval**.
- **Interval** — seconds per phase of box breathing (1–20s).
- **Phase** — one side of the box: Inhale, Hold, Exhale, Hold.
- **Rest** — a fixed recovery countdown between steps.

## Modules

- **Session** (`src/lib/session.svelte.ts`) — the protocol as a rune store. Owns step
  order, the collected measurements (`exhaleMs`, `interval`), and `pipIndex`/`canBack`.
  Interface: `current`, `advance()`, `back()`, `reset()`. The route is a thin renderer
  over it; step order lives in exactly one place (`ORDER`).
- **Calibration** (`src/lib/calibration.ts`) — pure domain rules: `isValidExhale`,
  `exhaleToInterval`, `clampInterval`, plus the named bounds. The single home for "what
  counts as a valid exhale" and "how an exhale maps to an interval".
- **Timer** (`src/lib/clock.svelte.ts`) — a reactive timer driven by wall-clock
  timestamps, not tick counts. Small interface (`elapsedMs`, `running`, `start`, `stop`,
  options) hides the loop, timestamp math, teardown, completion clamp, and the injectable
  `now`. The seam every screen's timing crosses (exhale stopwatch, rest countdown,
  box-breathing phase timer).
- **Theme** (`src/lib/theme.svelte.ts` + the pre-paint script in `src/app.html`) — theme
  mode + persistence behind one seam, applied before first paint to avoid a flash.

## Conventions

- Reactive shared state lives in `.svelte.ts` rune modules; pure logic in plain `.ts`;
  `.svelte` files stay thin views.
- Timing is derived from `elapsedMs`, never counted in ticks, so it stays correct under a
  fake clock that advances in one jump.
- Kick off a timer's imperative `start()` from `onMount`, never from `$effect` — writing
  `$state` synchronously inside an `$effect` body triggers an infinite flush loop
  (`effect_update_depth_exceeded`).
