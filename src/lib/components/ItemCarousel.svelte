<script>
    import { Slidy } from "@slidy/svelte";
    import { flip } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    // import { autoplay } from "@slidy/plugins";

    const images = [
        { src: "mimosa.png", width: "90vw", height: "405px" },
        { src: "volcano.png", width: "90vw", height: "405px" },
        { src: "tikis.png", width: "90vw", height: "405px" },
    ];
</script>
<div class="p-4">
    <Slidy
        animation={flip}
        slides={images}
        counter={false}
        duration={450}
        gravity={1.45}
        snap="deck"
        loop
        thumbnails={true}
        arrows={false}
        let:item
    />
</div>

<style>
    main {
        --icon-size: calc(2 * var(--font-size-8));
    }

    h2 {
        margin-bottom: var(--size-3);
    }

    main section {
        padding-block: var(--size-8);
        display: flex;
        flex-flow: column;
        align-items: center;
        gap: var(--size-2);
        text-align: center;
    }

    article {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--size-3);
        border-radius: var(--size-3);
    }
    :global(.slidy-slides) {
        justify-content: center;
    }
</style>
