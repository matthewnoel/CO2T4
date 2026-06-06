// Canonical list of every user-facing English string that has an authored
// translation. The English source doubles as the lookup key (gettext model), and
// `Message` is the union of these literals — so a locale catalog typed as
// `Record<Message, string>` is checked for completeness at compile time.
//
// Strings intentionally left out (proper nouns such as the citation, bare
// punctuation, and dynamic/numeric text) fall through to the per-locale fallback
// in translate() rather than being hand-translated.

export const MESSAGES = [
	// Warning
	'A Box',
	'Breathing',
	'Tool',
	'Before you begin',
	'A guide to the',
	'Box Breathing',
	'protocol from',
	'Medical disclaimer',
	'For educational use only. Not medical advice.',
	'Consult a licensed physician before any breathing exercise.',
	'Not affiliated with the study’s authors. No warranty.',
	'I understand this is an unofficial tool offered with no warranty, and I accept full responsibility for my use of it.',
	'Acknowledge & continue',
	'Source code',
	'Third-party licenses',

	// App shell
	'Carbon Dioxide Tolerance Testing & Training Tool',
	'Back',
	'Settle in for the exhale test.',
	'Recover before you calibrate.',

	// Exhale test
	'Step 01 · Exhale test',
	'Exhale as slowly as you can',
	'Measure your slowest exhale',
	'Tap',
	'Stop',
	'the moment you run out of air. Don’t hold your breath.',
	'Inhale completely through your nose. Then start the timer and let the air out as slowly as possible.',
	'Start',

	// Calibration
	'Step 02 · Calibration',
	'Set your interval',
	'Calibrated from your',
	'exhale. Each phase will last this long.',
	'Decrease interval',
	'seconds',
	'Increase interval',
	'Start box breathing',

	// Rest
	'Breathe normally',
	'Ideally through the nose.',
	'Skip →',

	// Box breathing
	'Box breathing',
	'left',
	'Inhale',
	'through your nose',
	'Hold',
	'keep it in',
	'Exhale',
	'slow and steady',
	'stay empty',
	'End session',

	// Done
	'Complete',
	'Great job',
	'You completed a full two-minute box-breathing cycle.',
	'Interval',
	'Duration',
	'Start over',

	// Theme toggle
	'Change to light theme.',
	'Change to dark theme.',

	// Locale switcher
	'Language'
] as const;

export type Message = (typeof MESSAGES)[number];
