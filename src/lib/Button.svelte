<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		variant = 'primary',
		size = 'md',
		full = false,
		disabled = false,
		onclick,
		type = 'button'
	}: {
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		full?: boolean;
		disabled?: boolean;
		onclick?: () => void;
		type?: 'button' | 'submit' | 'reset';
	} = $props();
</script>

<button {type} class="btn {variant} {size}" class:full {disabled} {onclick}>
	{@render children()}
</button>

<style>
	.btn {
		appearance: none;
		border: 1.5px solid transparent;
		border-radius: var(--radius);
		font-family: var(--font-body);
		font-weight: 600;
		line-height: 1.1;
		white-space: nowrap;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 9px;
		transition:
			background 0.16s,
			border-color 0.16s,
			color 0.16s,
			opacity 0.16s,
			filter 0.16s,
			transform 0.06s;
	}

	.btn.full {
		width: 100%;
	}

	.btn:disabled {
		opacity: 0.42;
		cursor: default;
	}

	.btn:active:not(:disabled) {
		transform: translateY(1px);
	}

	.md {
		padding: 14px 22px;
		font-size: 16.5px;
	}

	.lg {
		padding: 17px 26px;
		font-size: 18px;
	}

	.sm {
		padding: 9px 16px;
		font-size: 14px;
	}

	.primary {
		background: var(--accent);
		color: var(--accent-ink);
		border-color: var(--accent);
	}

	.primary:hover:not(:disabled) {
		filter: brightness(0.93);
	}

	.secondary {
		background: transparent;
		color: var(--ink);
		border-color: var(--line);
	}

	.secondary:hover:not(:disabled) {
		background: var(--sunken);
	}

	.ghost {
		background: transparent;
		color: var(--muted);
		border-color: transparent;
	}

	.ghost.sm {
		padding: 8px 10px;
	}

	.ghost:hover:not(:disabled) {
		color: var(--ink);
	}
</style>
