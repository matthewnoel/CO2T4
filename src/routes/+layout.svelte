<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { locale } from '$lib/i18n/locale.svelte';

	let { children } = $props();

	// Reflect the resolved locale (e.g. a deep-linked ?lang=) onto <html lang>
	// once the client is live. Done in onMount, not an $effect, to keep the
	// imperative DOM write out of reactive tracking.
	onMount(() => locale.syncDocument());
</script>

{@render children()}
