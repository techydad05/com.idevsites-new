<script>
    import { Slidy } from "@slidy/svelte";
    import { flip } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    const Plugins = import("@slidy/plugins");
    export let items = [];
    let slidyitem = items[0];

    const images = [
        {
            src: "mimosa.png",
            width: "90vw",
            height: "405px",
            title: "testies1",
        },
        {
            src: "volcano.png",
            width: "90vw",
            height: "405px",
            title: "testies2",
        },
        {
            src: "tikis.png",
            width: "90vw",
            height: "405px",
            title: "testies3",
        },
    ];
</script>

<div class="bg-secondary p-4">
    <!-- find out why plugins arent working in prod build.. might be dom not loaded  -->
    {#await Plugins}
        Loading....
    {:then Plugins}
        <div class="card card-side bg-base-100 shadow-xl flex-col">
            <figure class="!justify-start flex-1">
                <Slidy
                    on:index={(e) => (slidyitem = items[e.detail.index])}
                    getImgSrc={(item) => item.thumbnail}
                    --slidy-slide-width={"100%"}
                    --slidy-width={"100%"}
                    slides={items}
                    counter={false}
                    duration={450}
                    animation={flip}
                    snap="deck"
                    gravity={1.45}
                    loop
                    plugins={[Plugins.autoplay(), Plugins.log()]}
                    arrows={false}
                    let:item
                />
            </figure>
            <div class="card-body flex-1 flex-col px-4 py-0">
                <h2 class="card-title text-5xl leading-none">{slidyitem?.title}</h2>
                <p class="text-2xl">{slidyitem?.description}</p>
                <div class="card-actions justify-end p-4">
                    <button
                        on:click={() => location.assign(location.pathname)}
                        class="btn btn-primary">Go to</button
                    >
                </div>
            </div>
        </div>
        <!-- {JSON.stringify(slidyitem,null, 2)} -->
    {:catch error}
        {console.log(error)}
    {/await}
</div>

<style>
    h2 {
        margin-bottom: var(--size-3);
    }
    :global(.slidy-slides) {
        justify-content: center;
    }
    :global(.slidy) {
        display: inline-grid;
    }
    :global(.slidy-slides, .slidy) {
        overflow: visible !important;
    }
    /* learn how to use grid layout */
    .info-section {
        min-height: fit-content;
        vertical-align: middle;
        display: inline-grid;
        grid-auto-columns: 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
            ". title ."
            ". desc ."
            ". button .";
    }
    .title {
        grid-area: title;
    }
    .desc {
        grid-area: desc;
        grid-column: span 3;
    }
    .button {
        grid-area: button;
    }
</style>
