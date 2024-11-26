<script>
    import { createEventDispatcher } from 'svelte';
    let { milliseconds } = $props();

    let seconds = $state(Math.round(milliseconds / 6000));
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
    <div class="number">
        <div>
            <input class="symbol" type="button" value="-" onclick={onMinus} disabled={seconds - 1 < MIN_BREATH}>
        </div>
        <div>
            <h1>{seconds}</h1>
        </div>
        <div>
            <input class="symbol" type="button" value="+" onclick={onPlus} disabled={seconds + 1 > MAX_BREATH}>
        </div>
    </div>
    <p>Second Box Breathing Interval</p>
    <input type="button" value="Start" onclick={onTimeFinal}>
</div>

<style>
    h1 {
        font-size: 8rem;
        padding: 0 0.25em;
    }

    p {
        margin: 1.5em 0 2em 0;
    }

    .number {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }

    .symbol {
        padding: 0;
        border-radius: 50%;
        width: 3em;
        height: 3em;
    }
</style>
