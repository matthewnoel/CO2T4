<script>
    import Reset from "./Reset.svelte";
    import ExhaleTest from "./ExhaleTest.svelte";
    import TimeConversion from "./TimeConversion.svelte";
    import BoxBreathing from "./BoxBreathing.svelte";

    let step = 0;
    let milliseconds;
    let seconds;

    function handleMessage(event) {
        if (event.detail.isDone) {
            step = 1;
        }
    }

    function handleExhaleMessage(event) {
        milliseconds = event.detail.milliseconds;
        step = 2
    }

    function handleConversionMessage(event) {
        seconds = event.detail.seconds;
        step = 3;
    }
</script>

{#if step === 0}
    <Reset on:message={handleMessage} />
{:else if step === 1}
    <ExhaleTest on:message={handleExhaleMessage} />
{:else if step === 2}
    <TimeConversion {milliseconds} on:message={handleConversionMessage} />
{:else if step === 3}
    <BoxBreathing {seconds} />
{:else}
    <p>Oops. Something went wrong</p>
{/if}
