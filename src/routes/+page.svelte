<script>
    import CanvasDetails from "../components/CanvasDetails.svelte";

    /**
     * @type {import('./$types').PageData}
     */
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
        <br />
        <p><b>Clicking on an image will open it in a new tab</b></p>
    </div>
    {#each [...data.canvases].reverse() as canvas}
        <CanvasDetails canvas={canvas.code} meta={canvas} active={canvas.active} />
    {/each}
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
</style>
