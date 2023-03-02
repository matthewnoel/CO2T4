<script>
    import { createEventDispatcher } from 'svelte';
    export let milliseconds;

    let seconds = Math.round(milliseconds / 6000);
    const ONE_SECOND = 1;
    const TWENTY_SECONDS = 20;
    const MIN_BREATH = ONE_SECOND;
    const MAX_BREATH = TWENTY_SECONDS;
    const dispatch = createEventDispatcher();

    function onTimeFinal() {
        dispatch('message', {
            seconds,
        });
    }

    function onPlus() {
        if (seconds + 1 > MAX_BREATH) {
            return;
        }
        seconds++;
    }

    function onMinus() {
        if (seconds - 1 < MIN_BREATH) {
            return;
        }
        seconds--;
    }
</script>

<div id="outer">
    <p>{seconds} Second Box Breathing Interval</p>
    <div>
        <input type="button" value="-" on:click={onMinus} disabled={seconds - 1 < MIN_BREATH}>
        <input type="button" value="+" on:click={onPlus} disabled={seconds + 1 > MAX_BREATH}>
    </div>
    <input id="ok" type="button" value="Ok" on:click={onTimeFinal}>
</div>

<style>
    #outer {
        padding: 5em;
    }

    #ok {
        width: 100%;
    }

    p {
        font-size: 2rem;
    }

    input {
        padding: 2em;
        font-size: 2rem;
    }
</style>