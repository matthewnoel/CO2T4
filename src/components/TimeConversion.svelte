<script>
    import { createEventDispatcher } from 'svelte';

    export let milliseconds;
    let seconds = Math.round(milliseconds / 1000);

    const dispatch = createEventDispatcher();

    function onTimeFinal() {
        dispatch('message', {
            seconds,
        });
    }

    function onPlus() {
        if (seconds + 1 > 12) {
            return;
        }
        seconds++;
    }

    function onMinus() {
        if (seconds - 1 < 1) {
            return;
        }
        seconds--;
    }
</script>

<div>
    <p>{seconds}</p>
    <div>
        <input type="button" value="-" on:click={onMinus} disabled={seconds - 1 < 1}>
        <input type="button" value="+" on:click={onPlus} disabled={seconds + 1 > 12}>
    </div>
    <input type="button" value="Ok" on:click={onTimeFinal}>
</div>