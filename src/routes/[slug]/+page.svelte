<script>
    import moment from 'moment';
    import ArrowLeft from 'svelte-bootstrap-icons/lib/ArrowLeft.svelte';

    import ImageWrapper from '../../components/ImageWrapper.svelte';
    import VideoWrapper from '../../components/VideoWrapper.svelte';

    export let data;

    /**
     * Metadata about the canvas.
     * See static/data/meta.yml for more.
     * @type {object}
     */
    let { canvas } = data;

    const startDate = new Date(canvas.start);
    const startDateStr = startDate.toLocaleDateString(undefined, { dateStyle: 'full' });
    const endDate = new Date(canvas.end);
    const endDateStr = endDate.toLocaleDateString(undefined, { dateStyle: 'full' });
    const duration = (canvas.active ? '~' : '') + (canvas.active ? moment() : moment(endDate)).diff(moment(startDate), 'days');

    let loadedImages = new Map();
</script>

<div class="header">
    <a href="/" class="back-button">
        <ArrowLeft class="arrow" width={20} height={20} />
    </a>
    <h1>Canvas {canvas.code}{#if canvas.active}&nbsp;(Active){/if}</h1>
</div>
<div class="body">
    <div class="media-group">
        <ImageWrapper
            src="data/images/canvas-{canvas.code}-initial.png"
            caption="Initial canvas"
            alt="Initial board of canvas {canvas.code}"
            {loadedImages}
        />
        {#if !canvas.active}
            <ImageWrapper
                src="data/images/canvas-{canvas.code}-final.png"
                caption="Final canvas"
                alt="Final board of canvas {canvas.code}"
                {loadedImages}
            />
        {/if}
    </div>
    {#if canvas}
        <ul>
            <li>Started: <strong>{startDateStr}</strong></li>
            {#if !canvas.active}
                <li>Ended: <strong>{endDateStr}</strong></li>
            {/if}
            <li>Duration: <strong>{duration} days</strong></li>
        </ul>
        {#if canvas.description}
            <br>
            <p>{@html canvas.description}</p>
        {/if}
        {#if canvas.hasTimelapses}
            <h2>Timelapses</h2>
            <div class="media-group">
                {#if canvas.timelapses.normal}
                    <div class="timelapse-container" data-sveltekit-preload-data="off">
                        <p><strong>Normal</strong>; 1 frame every 5 minutes:</p>
                        <p><a href="data/videos/{canvas.timelapses.normal.fileName}">{canvas.timelapses.normal.fileName}</a> - {canvas.timelapses.normal.fileSize}</p>
                        <VideoWrapper
                            src="data/videos/{canvas.timelapses.normal.fileName}"
                            poster="data/images/canvas-{canvas.code}-final.png"
                            fileSize={canvas.timelapses.normal.fileSize}
                        />
                    </div>
                {/if}
                {#if canvas.timelapses.activity}
                    <div class="timelapse-container" data-sveltekit-preload-data="off">
                        <p><strong>Activity</strong>; 1 frame every 5 minutes:</p>
                        <p><a href="data/videos/{canvas.timelapses.activity.fileName}">{canvas.timelapses.activity.fileName}</a> - {canvas.timelapses.activity.fileSize}</p>
                        <VideoWrapper
                            src="data/videos/{canvas.timelapses.activity.fileName}"
                            poster="data/images/c{canvas.code}_heat_0.png"
                            fileSize={canvas.timelapses.activity.fileSize}
                        />
                    </div>
                {/if}
                {#if canvas.timelapses.virgin}
                    <div class="timelapse-container" data-sveltekit-preload-data="off">
                        <p><strong>Virgin</strong>; 1 frame every 5 minutes:</p>
                        <p><a href="data/videos/{canvas.timelapses.virgin.fileName}">{canvas.timelapses.virgin.fileName}</a> - {canvas.timelapses.virgin.fileSize}</p>
                        <VideoWrapper
                            src="data/videos/{canvas.timelapses.virgin.fileName}"
                            poster="data/images/c{canvas.code}_virgin_0.png"
                            fileSize={canvas.timelapses.virgin.fileSize}
                        />
                    </div>
                {/if}
            </div>
        {/if}
        {#if canvas.hasGraphs}
            <h2>Graphs</h2>
            <div class="media-group">
                {#if canvas.graphs.heat}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_heat_0.png"
                        caption="Heat"
                        alt="Heat"
                        {loadedImages}
                    />
                {/if}
                {#if canvas.graphs.virgin}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_virgin_0.png"
                        caption="Virginmap"
                        alt="Virginmap"
                        {loadedImages}
                    />
                {/if}
            </div>
            <div class="media-group">
                {#if canvas.graphs.action}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_action_0.png"
                        caption="Actions"
                        alt="Actions"
                        {loadedImages}
                    />
                {/if}
                {#if canvas.graphs.age}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_age_0.png"
                        caption="Age"
                        alt="Age"
                        {loadedImages}
                    />
                {/if}
                {#if canvas.graphs.combined}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_combined_0.png"
                        caption="Combined"
                        alt="Combined"
                        {loadedImages}
                    />
                {/if}
            </div>
            <div class="media-group">
                {#if canvas.graphs.minutes}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_minutes_0.png"
                        caption="Minutes"
                        alt="Minutes"
                        {loadedImages}
                    />
                {/if}
                {#if canvas.graphs.seconds}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_seconds_0.png"
                        caption="Seconds"
                        alt="Seconds"
                        {loadedImages}
                    />
                {/if}
                {#if canvas.graphs.milliseconds}
                    <ImageWrapper
                        src="data/images/c{canvas.code}_milliseconds_0.png"
                        caption="Milliseconds"
                        alt="Milliseconds"
                        {loadedImages}
                    />
                {/if}
            </div>
        {/if}
    {/if}
</div>

<style>
.header {
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;
    padding: 15px;
    background: #AAF;
    vertical-align: middle;
}

.back-button {
    color: initial;
    height: auto;
    background: #CCF;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

:global(.back-button .arrow) {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.body {
    padding: 15px;
}

.body ul li + li {
    margin-top: 5px;
}

.timelapse-container {
    display: inline-block;
}

.timelapse-container:not(:last-child) {
    margin-bottom: 10px;
}

.media-group {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.media-group + .media-group {
    margin-top: 5px;
}
</style>
