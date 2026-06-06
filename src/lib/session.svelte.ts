export type Step = 'warning' | 'rest1' | 'exhale' | 'rest2' | 'calibrate' | 'breathe' | 'done';

const ORDER: Step[] = ['warning', 'rest1', 'exhale', 'rest2', 'calibrate', 'breathe', 'done'];

// Progress-pip index per step (the final "done" screen reuses breathe's pip).
const PIP_OF: Record<Step, number> = {
	warning: 0,
	rest1: 1,
	exhale: 2,
	rest2: 3,
	calibrate: 4,
	breathe: 5,
	done: 5
};

export const PIP_TOTAL = 6;

export class Session {
	current = $state<Step>('warning');
	exhaleMs = $state(12400);
	interval = $state(4);

	pipIndex = $derived(PIP_OF[this.current]);
	canBack = $derived(ORDER.indexOf(this.current) > 0 && this.current !== 'done');

	/** Move forward one step in the protocol. */
	advance() {
		const i = ORDER.indexOf(this.current);
		if (i >= 0 && i < ORDER.length - 1) this.current = ORDER[i + 1];
	}

	/** Step back one step (no-op when not allowed). */
	back() {
		if (!this.canBack) return;
		const i = ORDER.indexOf(this.current);
		if (i > 0) this.current = ORDER[i - 1];
	}

	/** Restart the whole protocol. */
	reset() {
		this.current = 'warning';
	}
}

export function createSession() {
	return new Session();
}
