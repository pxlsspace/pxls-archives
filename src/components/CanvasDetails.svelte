<script>
    import moment from 'moment';
    import ImageWrapper from './ImageWrapper.svelte';
    import VideoWrapper from './VideoWrapper.svelte';

    /**
     * Metadata about the canvas.
     * See static/data/meta.yml for more.
     * @type {object}
     */
    export let canvas;

    const startDate = new Date(canvas.start);
    const startDateStr = startDate.toLocaleDateString(undefined, { dateStyle: 'full' });
    const endDate = new Date(canvas.end);
    const endDateStr = endDate.toLocaleDateString(undefined, { dateStyle: 'full' });
    const duration = moment(endDate).diff(moment(startDate), 'days');

    /**
     * Whether the details is open (expanded).
     */
    let isOpen = canvas.active;

    let loadedImages = new Map();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<details bind:open={isOpen}>
    <summary class="card card-button">Canvas {canvas.code}{#if canvas.active}&nbsp;(Active){/if}</summary>
    <div class="canvas-body">
        {#if isOpen}
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
                {#if canvas.end}
                    <p>Canvas {canvas.code} started on <strong>{startDateStr}</strong> and ended on <strong>{endDateStr}</strong>. It lasted <strong>{duration} days</strong>.</p>
                {:else}
                    <p>Canvas {canvas.code} started on <strong>{startDateStr}</strong>.</p>
                {/if}
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
        {/if}
    </div>
</details>

<style>
details:not(:last-child) {
    margin-bottom: 15px;
}

details summary {
    font-weight: bold;
    font-size: 1.25rem;
    user-select: none;
}

details[open] summary {
    border-radius: 15px 15px 0 0;
}

.canvas-body {
    background: #EEF;
    border-radius: 0 0 15px 15px;
    padding: 15px;
}

.canvas-body .timelapse-container {
    display: inline-block;
}

.canvas-body .timelapse-container:not(:last-child) {
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
