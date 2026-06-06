<script>
	let { name, size = 20, stroke = 'currentColor', sw = 1.8 } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	{stroke}
	stroke-width={sw}
	stroke-linecap="round"
	stroke-linejoin="round"
	style="display:block;flex:0 0 auto"
>
	{#if name === 'sun'}
		<circle cx="12" cy="12" r="4.2" />
		<path
			d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4L17 17M7 7L5.6 5.6"
		/>
	{:else if name === 'moon'}
		<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
	{:else if name === 'back'}
		<path d="M15 5l-7 7 7 7" />
	{:else if name === 'check'}
		<path d="M4 12.5l5 5 11-11" />
	{:else if name === 'arrow'}
		<path d="M5 12h14M13 6l6 6-6 6" />
	{:else if name === 'restart'}
		<path d="M4 12a8 8 0 1 0 2.5-5.8" />
		<path d="M4 4v4h4" />
	{:else if name === 'info'}
		<circle cx="12" cy="12" r="9" />
		<path d="M12 11v5M12 7.6v.2" />
	{:else if name === 'nose'}
		<path d="M12 4v7.5c0 1.6 1.2 2.5 2.6 2.5M9.4 16.5a3 3 0 0 0 5.2 0" />
	{/if}
</svg>
