<script>
    import { createEventDispatcher } from 'svelte';
    const EIGHT_SECONDS = 8000;
    const dispatch = createEventDispatcher();
    const interval = setInterval(() => {
        clearInterval(interval);
        dispatch('message', {
            isDone: true,
        });
    }, EIGHT_SECONDS);
</script>

<p>Breath normally for now.</p>
<p>Ideally through the nose.</p>

<style>
    p {
        font-size: 2rem;
    }
</style>