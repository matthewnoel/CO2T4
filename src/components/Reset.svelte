<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const interval = setInterval(() => {
        clearInterval(interval);
        dispatch('message', {
            isDone: true,
        });
    }, 500);
</script>

<p>Breath normally</p>