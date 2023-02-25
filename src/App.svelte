<script>
    import Warning from "./components/Warning.svelte";
    import FlowManager from "./components/FlowManager.svelte";

    $: isWarningAcknowledged = false;

    function handleMessage(event) {
        isWarningAcknowledged = Boolean(event.detail.response);
    }
</script>

<main>
    {#if isWarningAcknowledged}
        <FlowManager />
    {:else}
        <Warning on:message={handleMessage} />
    {/if}
</main>

<style>
    main {
        background-color: tan;
    }
</style>