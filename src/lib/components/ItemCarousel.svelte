<script>
    import { Slidy } from "@slidy/svelte";
    import { flip } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    import { onMount } from "svelte";

    let Plugins = import("@slidy/plugins");

    // onMount(async () => {
    //     Plugins = import( "@slidy/plugins");
    //     console.log(Plugins)
    //     return Plugins;
    // })

    const images = [
        { src: "mimosa.png", width: "90vw", height: "405px" },
        { src: "volcano.png", width: "90vw", height: "405px" },
        { src: "tikis.png", width: "90vw", height: "405px" },
    ];
</script>

<node id="node" class="p-4">
    <!-- find out why plugins arent working in prod build.. might be dom not loaded  -->
    {#await Plugins}
        Loading....
    {:then Plugins}
        <Slidy
            on:change={() => console.log("changing")}
            slides={images}
            counter={false}
            duration={450}
            gravity={1.45}
            loop
            plugins={[Plugins.autoplay(),Plugins.log(),Plugins.marquee({delay: 1000, duration: 1000})]}
            arrows={false}
            let:item
            />
            <!-- animation={flip} -->
            <!-- snap="deck" -->
    {:catch error}
        {console.log(error)}
    {/await}
</node>

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
