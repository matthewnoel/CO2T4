<script>
    import { createEventDispatcher } from 'svelte';
    const SIX_SECONDS = 6000;
    const ONE_HUNDRED_TWENTY_SECONDS = 120000;
    const MIN_BREATH = SIX_SECONDS;
    const MAX_BREATH = ONE_HUNDRED_TWENTY_SECONDS;
    const dispatch = createEventDispatcher();
    let start = null;

    function onTimeCalculated(milliseconds) {
        dispatch('message', {
            milliseconds,
        });
    }

    function startTimer() {
        start = Date.now();
    }

    function stopTimer() {
        const exhale = Date.now() - start;
        if (exhale < MIN_BREATH || exhale > MAX_BREATH) {
            start = null;
            return;
        }
        onTimeCalculated(exhale);
    }
</script>

<div>
    {#if start == null}
        <p>Breath in completely through your nose.</p>
        <p>Then start the timer and exhale as slowly as you can.</p>
    {:else}
        <p>Click "Stop" when you run out of air.</p>
        <p>Do not hold your breath.</p>
    {/if}
    <input type="button" value={(start == null) ? 'Start' : 'Stop'} on:click={(start == null) ? startTimer : stopTimer}>
</div>

<style>
    div {
        padding: 2em;
    }
    input {
        width: 100%;
    }
</style>