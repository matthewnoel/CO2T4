// Calibration — the domain rules that turn a measured exhale into a box-breathing
// interval. These constants and functions are the single home for "what counts as a
// valid exhale" and "how an exhale maps to an interval", which previously lived as bare
// magic numbers inside ExhaleTest and TimeConversion.

/** A measured exhale is only accepted inside this range (milliseconds). */
export const MIN_EXHALE_MS = 6_000;
export const MAX_EXHALE_MS = 120_000;

/** Box-breathing interval bounds (seconds per phase). */
export const MIN_INTERVAL_S = 1;
export const MAX_INTERVAL_S = 20;

/** Each interval-second is calibrated from this much exhale. */
const MS_PER_INTERVAL_SECOND = 6_000;

/** Whether a measured exhale is plausible enough to calibrate from. */
export function isValidExhale(ms: number): boolean {
	return ms >= MIN_EXHALE_MS && ms <= MAX_EXHALE_MS;
}

/** Round a measured exhale to a starting box-breathing interval, clamped to bounds. */
export function exhaleToInterval(ms: number): number {
	return clampInterval(Math.round(ms / MS_PER_INTERVAL_SECOND));
}

/** Clamp an interval (seconds) to the allowed range. */
export function clampInterval(secs: number): number {
	return Math.max(MIN_INTERVAL_S, Math.min(MAX_INTERVAL_S, secs));
}
