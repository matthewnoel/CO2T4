<script>
    import Reset from "./Reset.svelte";
    import ExhaleTest from "./ExhaleTest.svelte";
    import TimeConversion from "./TimeConversion.svelte";
    import BoxBreathing from "./BoxBreathing.svelte";

    let step = $state(0);
    let milliseconds = $state();
    let seconds = $state();

    function handleMessage(event, nextStep) {
        if (event.detail.isDone) {
            step = nextStep;
        }
    }

    function handleExhaleMessage(event) {
        milliseconds = event.detail.milliseconds;
        step = 2
    }

    function handleConversionMessage(event) {
        seconds = event.detail.seconds;
        step = 4;
    }
</script>

{#if step === 0}
    <Reset on:message={(e) => handleMessage(e, 1)} />
{:else if step === 1}
    <ExhaleTest on:message={handleExhaleMessage} />
{:else if step === 2}
    <Reset on:message={(e) => handleMessage(e, 3)} />
{:else if step === 3}
    <TimeConversion {milliseconds} on:message={handleConversionMessage} />
{:else if step === 4}
    <BoxBreathing {seconds} />
{:else}
    <p>Oops. Something went wrong</p>
{/if}
