<script>
    import CanvasCard from '../components/CanvasCard.svelte';

    export let data;

    const version = 'v' + data.version;
</script>

<svelte:head>
    <title>Pxls Archives {version}</title>
</svelte:head>

<div id="container">
    <div class="card" id="meta">
        <h1>Pxls Archives <span id="version">{version}</span></h1>
        <h3><i>The start of something old</i></h3>
        <p>
            Welcome to the Pxls Archives! This page aims to provide historical data
            for canvases spanning from the very beginning to today.
        </p>
    </div>
    <div class="canvas-cards">
        {#each [...data.canvases].reverse() as canvas}
            <CanvasCard {canvas} />
        {/each}
    </div>
</div>

<style>
#version {
    font-size: 12px;
}

#meta {
    margin-bottom: 15px;
}

#container {
    margin: 15px;
}

.canvas-cards {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>
