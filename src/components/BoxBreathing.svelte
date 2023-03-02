<script>
    export let seconds;

    let isDone = false;
    let elapsed = 0;
    let index = 0;
    const steps = ['Breath in', 'Hold', 'Breath out', 'Hold'];
    $: text = steps[index];
    const TWO_MINUTES = 120;
    const interval = setInterval(() => {
        elapsed += seconds;
        if (elapsed >= TWO_MINUTES) {
            clearInterval(interval);
            isDone = true;
            return;
        }
        if (index >= 0 && index <= 2) {
            index++
        } else {
            index = 0;
        }
    }, seconds * 1000);
</script>

<div>
    {#if isDone}
        <p>Great job</p>
    {:else}
        <p>{text}</p>
    {/if}
</div>

<style>
    p {
        font-size: 2rem;
    }
</style>