<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let accepted = $state(false);

	function confirmWarning() {
		dispatch('message', {
			response: true
		});
	}
</script>

<div>
	<h1>Warning!</h1>
	<h2>Read Before Continuing</h2>
	<p>
		This tool is an approximate unofficial guide for the <strong>Box Breathing</strong> protocol
		described in
		<a href="https://doi.org/10.1016/j.xcrm.2022.100895" target="_blank" rel="noreferrer"
			>Brief Structured Respiration Practices Enhance Mood and Reduce Physiological Arousal</a
		>
	</p>
	<p>
		This tool is open source. The source code <a
			href="https://github.com/matthewnoel/CO2T4"
			target="_blank"
			rel="noreferrer">is available here</a
		>. Third-party licenses
		<a
			href="https://github.com/matthewnoel/CO2T4/blob/main/third-party-licenses.txt"
			target="_blank"
			rel="noreferrer">are available here</a
		>.
	</p>
	<p><strong class="important">This tool is intended for educational use only.</strong></p>
	<p>
		<strong class="important"
			>This tool is not affiliated with the authors of the aforementioned paper.</strong
		>
	</p>
	<p>
		<strong class="important"
			>This tool does not provide medical advice. Do not use this tool or any breathing exercise
			without consulting a licensed physician.</strong
		>
	</p>
	<fieldset>
		<legend>Terms of Use</legend>
		<div>
			<input type="checkbox" name="Test" id="abc" bind:checked={accepted} />
			<label for="abc"
				>I acknowledge this tool made by a random person on the internet is offered with no warranty
				and by continuing I accept full responsibility for my actions.</label
			>
		</div>
		<input
			type="button"
			value="Acknowledge and Continue"
			onclick={confirmWarning}
			disabled={!accepted}
		/>
	</fieldset>
</div>

<style>
	div {
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		font-size: 1rem;
	}

	input {
		font-size: 1rem;
	}

	fieldset {
		width: fit-content;
		margin: auto;
	}

	.important {
		color: red;
		text-decoration: underline;
	}
</style>
