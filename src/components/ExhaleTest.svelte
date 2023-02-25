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
    <p>Breath in fully then start the timer</p>
    <input type="button" value={(start == null) ? 'Start' : 'Stop'} on:click={(start == null) ? startTimer : stopTimer}>
</div>