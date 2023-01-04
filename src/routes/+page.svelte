<script>
    import CanvasDetails from "../components/CanvasDetails.svelte";

    /**
     * @type {import('./$types').PageData}
     */
    export let data;

    const version = 'v' + data.version;

    const finishedCanvases = ('1,2,3,4,5,6,7,8,9,10,11,12,13,13b,14,15,16,17,' +
    '18,19,20,21,21a,22,23,24,25,26,27,28,29,30,30a,31,32,33,34,34a,35,36,' +
    '37,38,39,40,41,42,43,43a,44,45,45a,46,47,48,49,50,51,52,53,54,55,56,' +
    '56a,57,58,59,60,60a,61,62,63').split(',');
    const activeCanvas = '64';
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
    <CanvasDetails canvas={activeCanvas} meta={data.canvases[activeCanvas]} active />
    {#each [...finishedCanvases] as canvas}
        <CanvasDetails canvas={canvas} meta={data.canvases[canvas]} />
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
