type Mode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/** Read the mode the pre-paint head script already applied to <html>. */
function resolveInitial(): Mode {
	if (typeof document !== 'undefined') {
		const attr = document.documentElement.getAttribute('data-theme');
		if (attr === 'light' || attr === 'dark') return attr;
	}
	return 'light';
}

class Theme {
	mode = $state<Mode>(resolveInitial());

	toggle() {
		this.mode = this.mode === 'dark' ? 'light' : 'dark';
		this.#apply();
	}

	#apply() {
		document.documentElement.setAttribute('data-theme', this.mode);
		try {
			localStorage.setItem(STORAGE_KEY, this.mode);
		} catch {
			// ignore storage failures (private mode, etc.)
		}
	}
}

export const theme = new Theme();
