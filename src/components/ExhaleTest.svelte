<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let start = null;

    function onTimeCalculated(milliseconds) {
        dispatch('message', {
            milliseconds,
        });
    }

    function startTimer() {
        start = Date.now();
        console.time('exhale');
    }

    function stopTimer() {
        const difference = Date.now() - start;
        if (difference < 1000 || difference > 120000) {
            start = null;
            console.log(`Invalid difference:${difference}.`);
            return;
        }
        onTimeCalculated(Date.now() - start);
    }
</script>

<div>
    <p>Breath in fully then start the timer</p>
    <input type="button" value={(start == null) ? 'Start' : 'Stop'} on:click={(start == null) ? startTimer : stopTimer}>
</div>