import type { Message } from '../messages';

// Authored L33T (leetspeak) for every catalogued message. House style: uppercase
// with the classic digit substitutions (A→4 B→8 E→3 G→9 I→1 L→1 O→0 S→5 T→7)
// plus a few iconic word swaps (you→J00, your→J00R, to→2, for→4).
//
// Typed as Record<Message, string>, so a missing translation — or a key that
// isn't a real message — is a compile-time error. Anything not listed here (the
// Balban citation, punctuation, numbers) is handled by the algorithmic transform
// fallback in translate().
export const l33t: Record<Message, string> = {
	// Warning
	'A Box': '4 80X',
	Breathing: '8R347H1N9',
	Tool: '7001',
	'Before you begin': '83F0R3 J00 83G1N',
	'A guide to the': '4 9U1D3 2 7H3',
	'Box Breathing': '80X 8R347H1N9',
	'protocol from': 'PR070C01 FR0M',
	'Medical disclaimer': 'M3D1C41 D15C141M3R',
	'For educational use only. Not medical advice.': '4 3DUC4710N41 U53 0N1Y. N07 M3D1C41 4DV1C3.',
	'Consult a licensed physician before any breathing exercise.':
		'C0N5U17 4 11C3N53D PHY51C14N 83F0R3 4NY 8R347H1N9 3X3RC153.',
	'Not affiliated with the study’s authors. No warranty.':
		'N07 4FF111473D W17H 7H3 57UDY’5 4U7H0R5. N0 W4RR4N7Y.',
	'I understand this is an unofficial tool offered with no warranty, and I accept full responsibility for my use of it.':
		'1 UND3R574ND 7H15 15 4N UN0FF1C141 7001 0FF3R3D W17H N0 W4RR4N7Y, 4ND 1 4CC3P7 FU11 R35P0N5181117Y 4 MY U53 0F 17.',
	'Acknowledge & continue': '4CKN0WL3D93 & C0N71NU3',
	'Source code': '50URC3 C0D3',
	'Third-party licenses': '7H1RD-P4R7Y 11C3N535',

	// App shell
	'Carbon Dioxide Tolerance Testing & Training Tool':
		'C4R80N D10X1D3 7013R4NC3 73571N9 & 7R41N1N9 7001',
	Back: '84CK',
	'Settle in for the exhale test.': '537713 1N 4 7H3 3XH413 7357.',
	'Recover before you calibrate.': 'R3C0V3R 83F0R3 J00 C41184R473.',

	// Exhale test
	'Step 01 · Exhale test': '573P 01 · 3XH413 7357',
	'Exhale as slowly as you can': '3XH413 45 510W1Y 45 J00 C4N',
	'Measure your slowest exhale': 'M345UR3 J00R 510W357 3XH413',
	Tap: '74P',
	Stop: '570P',
	'the moment you run out of air. Don’t hold your breath.':
		'7H3 M0M3N7 J00 RUN 0U7 0F 41R. D0N’7 H01D J00R 8R347H.',
	'Inhale completely through your nose. Then start the timer and let the air out as slowly as possible.':
		'1NH413 C0MP13731Y 7HR0U9H J00R N053. 7H3N 574R7 7H3 71M3R 4ND 137 7H3 41R 0U7 45 510W1Y 45 P0551813.',
	Start: '574R7',

	// Calibration
	'Step 02 · Calibration': '573P 02 · C41184R4710N',
	'Set your interval': '537 J00R 1N73RV41',
	'Calibrated from your': 'C41184R473D FR0M J00R',
	'exhale. Each phase will last this long.': '3XH413. 34CH PH453 W111 1457 7H15 10N9.',
	'Decrease interval': 'D3CR3453 1N73RV41',
	seconds: '53C0ND5',
	'Increase interval': '1NCR3453 1N73RV41',
	'Start box breathing': '574R7 80X 8R347H1N9',

	// Rest
	'Breathe normally': '8R347H3 N0RM411Y',
	'Ideally through the nose.': '1D3411Y 7HR0U9H 7H3 N053.',
	'Skip →': '5K1P →',

	// Box breathing
	'Box breathing': '80X 8R347H1N9',
	left: '13F7',
	Inhale: '1NH413',
	'through your nose': '7HR0U9H J00R N053',
	Hold: 'H01D',
	'keep it in': 'K33P 17 1N',
	Exhale: '3XH413',
	'slow and steady': '510W 4ND 5734DY',
	'stay empty': '574Y 3MP7Y',
	'End session': '3ND 535510N',

	// Done
	Complete: 'C0MP1373',
	'Great job': '9R347 J08',
	'You completed a full two-minute box-breathing cycle.':
		'J00 C0MP1373D 4 FU11 7W0-M1NU73 80X-8R347H1N9 CYC13.',
	Interval: '1N73RV41',
	Duration: 'DUR4710N',
	'Start over': '574R7 0V3R',

	// Theme toggle
	'Change to light theme.': 'CH4N93 2 119H7 7H3M3.',
	'Change to dark theme.': 'CH4N93 2 D4RK 7H3M3.',

	// Locale switcher
	Language: '14N9U493'
};
