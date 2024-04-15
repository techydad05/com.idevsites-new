<script>
    import { Slidy } from "@slidy/svelte";
    import { shuffle } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    import { backIn } from "svelte/easing";
    import NeonSigns from "./NeonSigns.svelte";
    import { scrollIntoView } from "../utils";
    const Plugins = import("@slidy/plugins");
    export let items = [];
    let slidyitem = items[0];
</script>

<div class="home-carousel flex-1 h-[80svh] mt-[20vh] relative">
    {#await Plugins}
        <div class="flex w-full h-full justify-center items-center">
            <span class="loading loading-ring w-14"></span>
        </div>
    {:then Plugins}
        <div
            class="w-full absolute h-full flex items-center justify-center z-10 text-center text-8xl md:text-[12rem] leading-[.6] pointer-events-none"
        >
            <NeonSigns sign="four" text={slidyitem.title} />
        </div>
        <Slidy
        let:item
        background={true}
            on:index={(e) => (slidyitem = items[e.detail.index])}
            getImgSrc={(item) => item.thumbnail}
            slides={items}
            easing={backIn}
            plugins={[Plugins.autoplay({ autoplay: true, duration: 5000 })]}
            snap="center"
            counter={false}
            arrows={false}
            loop
            --slidy-slide-width={"100%"}
            --slidy-slide-radius={"none"}
        >
        <button
                data-scroll="#section-2"
                class="btn btn-lg btn-primary absolute bottom-[20%] !px-4"
                on:click={scrollIntoView}
            >
                About Us</button
            >
        </Slidy>
    {:catch error}
        {console.log(error)}
    {/await}
</div>

<style>
    :global(.slidy) {
        gap: 0 !important;
    }
    :global(.home-carousel autoplay-button) {
        /* z-index: 20 !important; */
        display: none;
    }
</style>
