<script>
    import { Slidy } from "@slidy/svelte";
    import { shuffle } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    import  * as easings from "svelte/easing";
    import NeonSigns from "./NeonSigns.svelte";
    const Plugins = import("@slidy/plugins");
    export let items = [];
    let slidyitem = items[0];
</script>

<div class="flex-1 h-[80dvh] mt-[20vh] relative">
    {#await Plugins}
        <div class="flex w-full h-full justify-center items-center">
            <span class="loading loading-ring w-14"></span>
        </div>
        {:then Plugins}
        <div class="w-full absolute h-full flex items-center justify-center z-10 text-6xl md:text-9xl text-center">
            <NeonSigns sign="four" text={slidyitem.title} />
        </div>
        <Slidy
            on:index={(e) => (slidyitem = items[e.detail.index])}
            getImgSrc={(item) => item.thumbnail}
            slides={items}
            plugins={[
                Plugins.autoplay({ autoplay: true, duration: 5000 }),
                Plugins.log(),
            ]}
            background={true}
            snap="center"
            counter={false}
            easing={easings.backIn}
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
