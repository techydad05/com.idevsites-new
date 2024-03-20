<script>
    import { Slidy } from "@slidy/svelte";
    import { flip } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    const Plugins = import("@slidy/plugins");
    export let items = [];

    const images = [
        {
            src: "mimosa.png",
            width: "90vw",
            height: "405px",
            figCap: "testies1",
        },
        {
            src: "volcano.png",
            width: "90vw",
            height: "405px",
            figCap: "testies2",
        },
        {
            src: "tikis.png",
            width: "90vw",
            height: "405px",
            figCap: "testies3",
        },
    ];
</script>

<div class="bg-secondary">
    <div class="bg-secondary-content">
        <!-- find out why plugins arent working in prod build.. might be dom not loaded  -->
        {#await Plugins}
            Loading....
        {:then Plugins}
            <Slidy
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
            >
                <div class="card w-96 glass">
                    <figure>
                        <img
                            src={item.thumbnail}
                            class="h-[40vw] mt-5"
                            alt={item.title}
                        />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">{item.title}</h2>
                        <p>{item.description}</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary"
                                >Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </Slidy>
        {:catch error}
            {console.log(error)}
        {/await}
    </div>
</div>

<style>
    h2 {
        margin-bottom: var(--size-3);
    }
    :global(.slidy-slides) {
        justify-content: center;
    }
    :global(.slidy-slides, .slidy) {
        overflow: visible !important;
    }
</style>
