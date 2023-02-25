<script>
    import { createEventDispatcher } from 'svelte';

    export let milliseconds;

    const dispatch = createEventDispatcher();

    function onTimeFinal() {
        dispatch('message', {
            seconds: milliseconds / 1000,
        });
    }
</script>

<p>{milliseconds}</p>
<input type="button" value="Ok" on:click={onTimeFinal}>