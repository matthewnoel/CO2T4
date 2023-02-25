<script>
    import { createEventDispatcher } from 'svelte';
    const FOUR_SECONDS = 4000;
    const dispatch = createEventDispatcher();
    const interval = setInterval(() => {
        clearInterval(interval);
        dispatch('message', {
            isDone: true,
        });
    }, FOUR_SECONDS);
</script>

<p>Breath normally</p>