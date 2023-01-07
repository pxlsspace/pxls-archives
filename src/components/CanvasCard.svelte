<script>
    import moment from 'moment';

    export let canvas;

    const startDate = new Date(canvas.start);
    const startDateStr = startDate.toLocaleDateString(undefined, { dateStyle: 'full' });
    const endDate = new Date(canvas.end);
    const endDateStr = endDate.toLocaleDateString(undefined, { dateStyle: 'full' });
    const duration = (canvas.active ? '~' : '') + (canvas.active ? moment() : moment(endDate)).diff(moment(startDate), 'days');
</script>

<a href="canvas-{canvas.code}">
    <div class="card">
        <div class="preview">
            <img
                src="data/images/thumbnails/canvas-{canvas.code}-initial.png"
                alt="Initial board of canvas {canvas.code}"
            />
        </div>
        <div class="description">
            <h2>Canvas {canvas.code}{#if canvas.active}&nbsp;(Active){/if}</h2>
            <p>Started: <strong>{startDateStr}</strong></p>
            {#if !canvas.active}
                <p>Ended: <strong>{endDateStr}</strong></p>
            {/if}
            <p>Duration: <strong>{duration} days</strong></p>
        </div>
    </div>
</a>

<style>
a {
    color: initial;
}

.card {
    display: flex;
    gap: 15px;
    background: #DDF;
    padding: 10px;
    align-self: baseline;
    border-radius: 15px;
}

.preview {
    width: 128px;
    height: 128px;
    background: white;
    border-radius: 5px;
}

.preview img {
    width: auto;
    height: auto;
    max-width: 96px;
    max-height: 96px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.description {
    flex-grow: 1;
}

h2 {
    display: inline;
    vertical-align: top;
    text-align: center;
}
</style>
