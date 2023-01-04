<script>
    import { onMount } from 'svelte';

    /**
     * The canvas code.
     * @type {string}
     */
    export let canvas;
    /**
     * Metadata about the canvas.
     * See static/data/meta.yml for more.
     * @type {object}
     */
    export let meta;
    /**
     * Whether the canvas is active. Disables the final canvas image if true.
     */
    export let active = false;

    /**
     * Whether the details is open (expanded).
     */
    let isOpen = true;

    
    /** @type {Element} The details element */
    let detailsEl;
    /** @type {Element} The initial image element */
    let initialImgEl;
    /** @type {Element} The final image element */
    let finalImgEl;

    onMount(() => {
        const observer = new MutationObserver(([{ target }]) => {
            // Only update image source attributes if opening details
            if (!target.open) return;
            if (!initialImgEl.getAttribute('src')) {
                initialImgEl.setAttribute('src', initialImgEl.getAttribute('data-src'));
            }
            if (finalImgEl && !finalImgEl.getAttribute('src')) {
                finalImgEl.setAttribute('src', finalImgEl.getAttribute('data-src'));
            }
        });

        observer.observe(detailsEl, { attributes: true, attributeFilter: ['open'] });
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<details open={isOpen} bind:this={detailsEl}>
    <summary class="card card-button">Canvas {canvas}{#if active}&nbsp;(Active){/if}</summary>
    <div class="canvas-body">
        <div class="image-wrapper">
            <img
                bind:this={initialImgEl}
                src={isOpen ? `data/images/canvas-${canvas}-initial.png` : null}
                data-src="data/images/canvas-{canvas}-initial.png"
                width="256px"
                onclick="window.open(this.src, '_blank');"
                alt="Initial board of canvas {canvas}"
            />
            <span>Initial canvas</span>
        </div>
        {#if !active}
            <div class="image-wrapper">
                <img
                    bind:this={finalImgEl}
                    src={isOpen ? `data/images/canvas-${canvas}-final.png` : null}
                    data-src="data/images/canvas-{canvas}-final.png"
                    width="256px"
                    onclick="window.open(this.src, '_blank');"
                    alt="Final board of canvas {canvas}"
                />
                <span>Final canvas</span>
            </div>
        {/if}
        {#if meta}
            <p><strong>{meta.start}</strong> - <strong>{meta.end}</strong></p>
            {#if meta.description}
                <p>{@html meta.description}</p>
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

.canvas-body img {
    display: block;
    margin: 16px;
    margin-bottom: 8px;
}

.canvas-body .image-wrapper {
    display: inline-block;
    border: 2px solid black;
    padding-bottom: 8px;
    background: #FFF;
}

.canvas-body .image-wrapper {
    text-align: center;
}
</style>
