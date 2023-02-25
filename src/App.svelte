<script>
    import Warning from "./components/Warning.svelte";
    import FlowManager from "./components/FlowManager.svelte";

    let isWarningAcknowledged = false;

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
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>