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

<div>
    <p>{seconds}</p>
    <div>
        <input type="button" value="-" on:click={onMinus} disabled={seconds - 1 < MIN_BREATH}>
        <input type="button" value="+" on:click={onPlus} disabled={seconds + 1 > MAX_BREATH}>
    </div>
    <input type="button" value="Ok" on:click={onTimeFinal}>
</div>