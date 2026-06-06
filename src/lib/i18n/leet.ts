// Leetspeak transform: a deterministic, purely cosmetic substitution of certain
// Latin letters with look-alike digits. Anything outside the map — other letters,
// digits, punctuation, whitespace, markup — passes through untouched, so numbers
// and interpolated values survive intact.

const SUBSTITUTIONS: Record<string, string> = {
	a: '4',
	b: '8',
	e: '3',
	g: '9',
	i: '1',
	l: '1',
	o: '0',
	s: '5',
	t: '7'
};

export function toLeet(input: string): string {
	let out = '';
	for (const ch of input) {
		out += SUBSTITUTIONS[ch.toLowerCase()] ?? ch;
	}
	return out;
}
