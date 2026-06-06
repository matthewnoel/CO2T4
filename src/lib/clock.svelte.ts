// A reactive timer driven by wall-clock timestamps rather than tick counts.
//
// Every screen that needs timing (the exhale stopwatch, the rest countdown, the
// box-breathing phase timer) used to re-implement the same loop: read Date.now(),
// poll on an interval, derive elapsed, clean up, and signal completion. The hard part
// is correctness under a clock that may advance in one large jump (a fake clock under
// test): you must derive everything from a real timestamp, never from how many times
// the loop fired. That invariant now lives here, once.
//
// The interface is small — `elapsedMs`, `running`, `start()`, `stop()` — but it hides
// the loop, the timestamp math, teardown, and the completion clamp. `now` is injectable
// so the timing logic can be exercised directly, without a browser.

export type Now = () => number;

export interface TimerOptions {
	/** When set, the timer auto-completes at this elapsed time and clamps to it. */
	durationMs?: number;
	/** Fired once, when the timer reaches `durationMs`. */
	onComplete?: () => void;
	/** Poll cadence in milliseconds (default 200). */
	pollMs?: number;
	/** Injectable clock source; defaults to Date.now (override in tests). */
	now?: Now;
}

export interface Timer {
	/** Elapsed milliseconds since `start()`, reactive. Clamped to `durationMs`. */
	readonly elapsedMs: number;
	/** Whether the loop is currently running, reactive. */
	readonly running: boolean;
	/** Begin (or restart) timing from now. */
	start(): void;
	/** Stop the loop and return the final elapsed milliseconds. */
	stop(): number;
}

class WallClockTimer implements Timer {
	#elapsed = $state(0);
	#running = $state(false);
	#start = 0;
	#cancel: (() => void) | null = null;

	readonly #durationMs?: number;
	readonly #onComplete?: () => void;
	readonly #pollMs: number;
	readonly #now: Now;

	constructor(opts: TimerOptions = {}) {
		this.#durationMs = opts.durationMs;
		this.#onComplete = opts.onComplete;
		this.#pollMs = opts.pollMs ?? 200;
		this.#now = opts.now ?? (() => Date.now());
	}

	get elapsedMs() {
		return this.#elapsed;
	}

	get running() {
		return this.#running;
	}

	#measure(): number {
		const raw = this.#now() - this.#start;
		return this.#durationMs !== undefined ? Math.min(raw, this.#durationMs) : raw;
	}

	#tick = () => {
		const elapsed = this.#now() - this.#start;
		if (this.#durationMs !== undefined && elapsed >= this.#durationMs) {
			this.#elapsed = this.#durationMs;
			this.#teardown();
			this.#onComplete?.();
			return;
		}
		this.#elapsed = elapsed;
	};

	#teardown() {
		this.#running = false;
		this.#cancel?.();
		this.#cancel = null;
	}

	start() {
		this.#teardown();
		this.#start = this.#now();
		this.#elapsed = 0;
		this.#running = true;
		this.#tick();
		if (!this.#running) return; // completed on the first tick (e.g. zero duration)
		const id = setInterval(this.#tick, this.#pollMs);
		this.#cancel = () => clearInterval(id);
	}

	stop(): number {
		const final = this.#measure();
		this.#elapsed = final;
		this.#teardown();
		return final;
	}
}

export function createTimer(opts: TimerOptions = {}): Timer {
	return new WallClockTimer(opts);
}
