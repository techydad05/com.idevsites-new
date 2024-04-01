<script>
    import { Slidy } from "@slidy/svelte";
    import { shuffle } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    import * as easings from "svelte/easing";
    import NeonSigns from "./NeonSigns.svelte";
    const Plugins = import("@slidy/plugins");
    export let items = [];
    let slidyitem = items[0];

    function scrollIntoView({ target }) {
        const el = document.querySelector(target.getAttribute("href"));
        if (!el) return;
        el.scrollIntoView({
            behavior: "smooth",
        });
    }
</script>

<div class="home-carousel flex-1 h-[80dvh] mt-[20vh] relative">
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
            arrows
            --slidy-slide-width={"100%"}
            --slidy-slide-radius={"none"}
        >
            <div class="btn btn-primary absolute bottom-6">
                <a class="h-full w-full flex items-center justify-center" href="#section-2" on:click|preventDefault={scrollIntoView}>About Us</a>
            </div>
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
