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

<div class="p-4">
    <!-- find out why plugins arent working in prod build.. might be dom not loaded  -->
    {#await Plugins}
        Loading....
    {:then Plugins}   
        <Slidy --slidy-thumbnail-size={"100px"}
            slides={items}
            counter={false}
            duration={450}
            animation={flip}
            snap="deck"
            gravity={1.45}
            loop
            thumbnail
            getThumbSrc={(item) => item.thumbnail}
            plugins={[Plugins.autoplay(), Plugins.log()]}
            arrows={false}
            let:item
        >
            <div class="card w-96 glass">
              <figure><img src={item.thumbnail} class="h-[40vw] mt-5" alt={item.title}/></figure>
              <div class="card-body">
                <h2 class="card-title">{item.title}</h2>
                <p>{item.description}</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary">Add to Cart </button>
                </div>
              </div>
            </div>
        </Slidy>
    {:catch error}
        {console.log(error)}
    {/await}
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
