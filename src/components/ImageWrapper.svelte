<script>
    import MediaWrapper from './MediaWrapper.svelte';

    /** @type {string} The image source. */
    export let src;
    /** @type {string} The image caption. */
    export let caption;
    /** @type {string} The image alternative text. */
    export let alt;

    /** @type {Map} A map of loaded images. */
    export let loadedImages;

    function lazy(node, data) {
        if (loadedImages.has(data.src)) {
            node.setAttribute('src', data.src);
        } else {
            const img = new Image();
            img.src = data.src;
            img.onload = () => {
                loadedImages.set(data.src, img);
                node.setAttribute('src', data.src);
            }
        }

        return {
            destroy() {}
        }
    }
</script>
<MediaWrapper>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
        use:lazy="{{ src }}"
        width="256px"
        on:click={function() { window.open(this.src, '_blank') }}
        {alt}
    />
    <span>{caption}</span>
</MediaWrapper>

<style>
img {
    display: block;
    margin: 16px;
    margin-bottom: 8px;
    cursor: pointer;
}
</style>
