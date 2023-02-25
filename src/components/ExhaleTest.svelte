<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    $: start = null;

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
        onTimeCalculated(Date.now() - start);
    }
</script>

<p>Breath in fully then start the timer</p>
<input type="button" value={(start == null) ? 'Start' : 'Stop'} on:click={(start == null) ? startTimer : stopTimer}>