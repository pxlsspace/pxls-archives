<script>
    import MediaWrapper from './MediaWrapper.svelte';

    export let src;
    export let poster;
    export let fileSize;

    /** @type {HTMLSpanElement} */
    let loadTextElem;

    /**
     * Fired when a video element is clicked.
     * @param {PointerEvent} event
     */
    function onVideoClick(event) {
        /** @type {HTMLVideoElement} */
        const video = event.target;
        video.play();
    }

    function onCanPlay() {
        loadTextElem.style.display = 'none';
    }
</script>

<MediaWrapper>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video controls preload="none" {poster} width="256px" on:click|once={onVideoClick} on:canplay={onCanPlay}>
        <source {src} type="video/mp4" />
    </video>
    <span class="load-text" bind:this={loadTextElem}>Load - {fileSize}</span>
</MediaWrapper>

<style>
.load-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    background: white;
    pointer-events: none;
}

video {
    display: block;
    margin: 16px;
    margin-bottom: 8px;
    cursor: pointer;
}
</style>
