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
	import { createSession, PIP_TOTAL } from '$lib/session.svelte';

	const session = createSession();
</script>

<div class="app">
	<header class="appbar">
		<div class="bar-side">
			{#if session.canBack}
				<button class="icon-btn" aria-label="Back" onclick={() => session.back()}>
					<Icon name="back" size={19} />
				</button>
			{:else}
				<Wordmark size={18} />
			{/if}
		</div>
		<Pips total={PIP_TOTAL} idx={session.pipIndex} />
		<div class="bar-side right">
			<ThemeToggle />
		</div>
	</header>

	<main class="screen">
		{#key session.current}
			<div class="co2t4-screen">
				{#if session.current === 'warning'}
					<Warning onAccept={() => session.advance()} />
				{:else if session.current === 'rest1'}
					<Reset
						sub="Settle in for the exhale test."
						onDone={() => session.advance()}
						onSkip={() => session.advance()}
					/>
				{:else if session.current === 'exhale'}
					<ExhaleTest
						onResult={(value) => {
							session.exhaleMs = value;
							session.advance();
						}}
					/>
				{:else if session.current === 'rest2'}
					<Reset
						sub="Recover before you calibrate."
						onDone={() => session.advance()}
						onSkip={() => session.advance()}
					/>
				{:else if session.current === 'calibrate'}
					<TimeConversion
						milliseconds={session.exhaleMs}
						onStart={(value) => {
							session.interval = value;
							session.advance();
						}}
					/>
				{:else if session.current === 'breathe'}
					<BoxBreathing
						interval={session.interval}
						onDone={() => session.advance()}
						onEnd={() => session.advance()}
					/>
				{:else}
					<Done
						exhaleMs={session.exhaleMs}
						interval={session.interval}
						onRestart={() => session.reset()}
					/>
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
