<script>
    import Warning from "$lib/Warning.svelte";
    import FlowManager from "$lib/FlowManager.svelte";
    import ThemeToggle from "$lib/ThemeToggle.svelte";

    let isWarningAcknowledged = $state(false);

    // @ts-ignore
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
    <footer>
        <ThemeToggle />
    </footer>
</main>

<style>
    main {
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    footer {
        position: fixed;
        top: 0;
        right: 0;
    }
</style>
