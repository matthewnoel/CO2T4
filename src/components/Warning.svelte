<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function confirmWarning() {
        dispatch('message', {
            response: true,
        });
    }
</script>
<div>
    <h1>Warning</h1>
    <input type="button" value="Ack" on:click={confirmWarning}>
</div>
