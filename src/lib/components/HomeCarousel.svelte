<script>
    import { Slidy } from "@slidy/svelte";
    import { shuffle } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    import { cubicInOut, linear } from "svelte/easing";
    import NeonSigns from "./NeonSigns.svelte";
    const Plugins = import("@slidy/plugins");
    export let items = [];
    let slidyitem = items[0];
</script>

<div class="flex-1 h-[80vh] mt-[20vh] relative">
    {#await Plugins}
        <!-- fix this for a better loading -->
        Loading....
    {:then Plugins}
        <div class="w-full absolute h-full flex items-center justify-center z-10 text-6xl md:text-9xl text-center">
            <NeonSigns sign="four" text={slidyitem.title} />
        </div>
        <Slidy
            on:index={(e) => (slidyitem = items[e.detail.index])}
            getImgSrc={(item) => item.thumbnail}
            slides={items}
            plugins={[
                Plugins.autoplay({ autoplay: true, duration: 4000 }),
                Plugins.log(),
            ]}
            let:item
            background={true}
            snap
            loop
            --slidy-slide-width={"100%"}
        />
    {:catch error}
        {console.log(error)}
    {/await}
</div>

<style>
    :global(.slidy) {
        gap: 0 !important;
    }
    :global(autoplay-button) {
        z-index: 20 !important;
    }
    /* h1 {
        transition: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    } */
</style>
