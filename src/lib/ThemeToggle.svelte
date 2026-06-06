<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/Icon.svelte';

	let mode = $state<'light' | 'dark'>('light');

	function apply(next: 'light' | 'dark') {
		document.documentElement.setAttribute('data-theme', next);
	}

	onMount(() => {
		const stored = localStorage.getItem('theme');
		const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		mode = stored === 'light' || stored === 'dark' ? stored : systemDark ? 'dark' : 'light';
		apply(mode);
	});

	function toggle() {
		mode = mode === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', mode);
		apply(mode);
	}
</script>

<button
	class="icon-btn"
	data-theme-toggle
	aria-label={mode === 'dark' ? 'Change to light theme.' : 'Change to dark theme.'}
	onclick={toggle}
>
	<Icon name={mode === 'dark' ? 'sun' : 'moon'} size={18} />
</button>
