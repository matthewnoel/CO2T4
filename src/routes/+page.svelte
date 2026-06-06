<script lang="ts">
	import Warning from '$lib/Warning.svelte';
	import Reset from '$lib/Reset.svelte';
	import ExhaleTest from '$lib/ExhaleTest.svelte';
	import TimeConversion from '$lib/TimeConversion.svelte';
	import BoxBreathing from '$lib/BoxBreathing.svelte';
	import Done from '$lib/Done.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import Wordmark from '$lib/Wordmark.svelte';
	import Pips from '$lib/Pips.svelte';
	import Icon from '$lib/Icon.svelte';

	type Step = 'warning' | 'rest1' | 'exhale' | 'rest2' | 'calibrate' | 'breathe' | 'done';

	// Progress-pip index for each step (the final "done" screen reuses breathe's).
	const PIP: Record<Step, number> = {
		warning: 0,
		rest1: 1,
		exhale: 2,
		rest2: 3,
		calibrate: 4,
		breathe: 5,
		done: 5
	};

	let step = $state<Step>('warning');
	let hist = $state<Step[]>([]);
	let exhaleMs = $state(12400);
	let interval = $state(4);

	function go(next: Step) {
		hist = [...hist, step];
		step = next;
	}

	function back() {
		if (!hist.length) return;
		const h = [...hist];
		step = h.pop() as Step;
		hist = h;
	}

	function reset() {
		hist = [];
		step = 'warning';
	}

	let canBack = $derived(hist.length > 0 && step !== 'done');
</script>

<div class="app">
	<header class="appbar">
		<div class="bar-side">
			{#if canBack}
				<button class="icon-btn" aria-label="Back" onclick={back}>
					<Icon name="back" size={19} />
				</button>
			{:else}
				<Wordmark size={18} />
			{/if}
		</div>
		<Pips total={6} idx={PIP[step]} />
		<div class="bar-side right">
			<ThemeToggle />
		</div>
	</header>

	<main class="screen">
		{#key step}
			<div class="co2t4-screen">
				{#if step === 'warning'}
					<Warning onAccept={() => go('rest1')} />
				{:else if step === 'rest1'}
					<Reset
						sub="Settle in for the exhale test."
						onDone={() => go('exhale')}
						onSkip={() => go('exhale')}
					/>
				{:else if step === 'exhale'}
					<ExhaleTest
						onResult={(value) => {
							exhaleMs = value;
							go('rest2');
						}}
					/>
				{:else if step === 'rest2'}
					<Reset
						sub="Recover before you calibrate."
						onDone={() => go('calibrate')}
						onSkip={() => go('calibrate')}
					/>
				{:else if step === 'calibrate'}
					<TimeConversion
						milliseconds={exhaleMs}
						onStart={(value) => {
							interval = value;
							go('breathe');
						}}
					/>
				{:else if step === 'breathe'}
					<BoxBreathing {interval} onDone={() => go('done')} onEnd={() => go('done')} />
				{:else}
					<Done {exhaleMs} {interval} onRestart={reset} />
				{/if}
			</div>
		{/key}
	</main>
</div>

<style>
	.app {
		height: 100dvh;
		max-width: 460px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.appbar {
		flex: 0 0 auto;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px 0 14px;
	}

	.bar-side {
		min-width: 76px;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.bar-side.right {
		justify-content: flex-end;
	}

	.screen {
		flex: 1 1 auto;
		min-height: 0;
		position: relative;
	}
</style>
