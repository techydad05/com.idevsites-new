<script>
    import { flip } from "@slidy/animation";
    import { fade, fly, slide } from "svelte/transition";
    import { Slidy } from "@slidy/svelte";
    import "@slidy/svelte/dist/slidy.css";
    import { createImageGroups } from "../utils";
    const Plugins = import("@slidy/plugins");
    export let storeData = {};
    let currentProducts = [];
    $: currentProducts = filterProducts(category);
    let manyArr = [];
    $: manyArr = createImageGroups(currentProducts);
    let singleItem = currentProducts[0];
    let single = false;
    let index = 0;
    let category = "";

    const setSingle = (el) => {
        console.log(el.id);
        singleItem = currentProducts[el.id];
        single = true;
    };

    const filterProducts = (category) => {
        if (category === "") {
            console.log("loading storeData.products");
            return storeData.products;
        } else {
            console.log("loading currentProducts");
            let categoryID = storeData.categories.find(
                (cat) => cat.handle === category,
            )?.id;
            currentProducts = storeData.products.filter((product) => {
                return product.collection_id === categoryID;
            });
            console.log("Active Products:", currentProducts);
            return currentProducts;
        }
    };
</script>

<div
    class="item-carousel bg-primary p-4 flex flex-wrap items-center justify-center"
>
    {#await Plugins}
        <div class="flex w-full h-full justify-center items-center">
            <span class="loading loading-ring w-14"></span>
        </div>
    {:then Plugins}
        <div class="w-full flex justify-center gap-4 mb-4">
            <button
                class="btn btn-lg btn-secondary"
                on:click={() => (category = "sushi")}>Sushi</button
            >
            <button
                class="btn btn-lg btn-secondary"
                on:click={() => (category = "food")}>Food</button
            >
            <button
                class="btn btn-lg btn-secondary"
                on:click={() => (category = "drinks")}>Drinks</button
            >
            {#if single}
                <button
                    class="btn btn-lg btn-secondary"
                    on:click={() => (single = false)}>Back</button
                >
            {/if}
        </div>
        {#if single}
            <div
                class="card card-side bg-base-100 shadow-xl flex-col md:max-w-[50vw]"
            >
                <figure class="!justify-start flex-1">
                    <Slidy
                        --slidy-slide-width={"100%"}
                        --slidy-slide-height={"250px"}
                        on:index={(e) => {
                            console.log(e);
                            index = e.detail.index;
                        }}
                        getImgSrc={(index) => singleItem.thumbnail}
                        slides={currentProducts}
                        background={true}
                        counter={false}
                        arrows={false}
                        snap={"center"}
                        loop
                        let:item
                    />
                </figure>
                <div class="card-body flex-1 flex-col px-4 py-4">
                    <h2 class="card-title text-5xl leading-none">
                        {singleItem?.title}
                    </h2>
                    <p class="text-2xl">{singleItem?.description}</p>
                    <div class="card-actions justify-end p-4">
                        <button
                            on:click={() =>
                                location.assign(
                                    location.pathname +
                                        "product/" +
                                        singleItem.handle,
                                )}
                            class="btn btn-primary">Go to</button
                        >
                    </div>
                </div>
            </div>
        {:else if category === "drinks"}
        <div class="hero" style="background-image: url(/drinks.jpg);">
            <div class="hero-overlay bg-opacity-60"></div>
            <div class="hero-content text-center text-neutral-100">
              <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">No drinks here yet!</h1>
                <p class="mb-5 text-2xl">..but if you can make it in to see us we got you!</p>
              </div>
            </div>
          </div>
        {:else}
            <figure class="!justify-start flex-1">
                <Slidy
                    bind:index
                    let:item
                    getImgSrc={(index) => currentProducts[index]?.thumbnail}
                    snap={"start"}
                    slides={manyArr}
                >
                    <div class="grid-container text-black">
                        <div
                            on:click={(e) => setSingle(e.currentTarget)}
                            id={item.id1}
                            style={`background-image: url(${currentProducts[item.id1]?.thumbnail});`}
                            class="element1 bg-cover bg-center bg-no-repeat"
                        ></div>
                        {#if currentProducts[item.id2]}
                            <div
                                on:click={(e) => setSingle(e.currentTarget)}
                                id={item.id2}
                                style={`background-image: url(${currentProducts[item.id2]?.thumbnail});`}
                                class="element2 bg-cover bg-center bg-no-repeat"
                            ></div>
                        {:else}
                            <div
                                class="skeleton w-full h-full rounded-none"
                            ></div>
                        {/if}
                        {#if currentProducts[item.id3]}
                            <div
                                on:click={(e) => setSingle(e.currentTarget)}
                                id={item.id3}
                                style={`background-image: url(${currentProducts[item.id3]?.thumbnail});`}
                                class="element3 bg-cover bg-center bg-no-repeat"
                            ></div>
                        {:else}
                            <div
                                class="skeleton w-full h-full rounded-none"
                            ></div>
                        {/if}
                        {#if currentProducts[item.id4]}
                            <div
                                on:click={(e) => setSingle(e.currentTarget)}
                                id={item.id4}
                                style={`background-image: url(${currentProducts[item.id4]?.thumbnail});`}
                                class="element4 bg-cover bg-center bg-no-repeat"
                            ></div>
                        {:else}
                            <div
                                class="skeleton w-full h-full rounded-none"
                            ></div>
                        {/if}
                    </div>
                </Slidy>
            </figure>
        {/if}
    {:catch error}
        {console.log(error)}
    {/await}
</div>

<style>
    :global(.item-carousel li.slidy-slide) {
        width: 100% !important;
    }
    .grid-container {
        width: 100%;
        height: 300px;
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        gap: 4px;
        background-color: oklch(var(--s));
        padding: 4px;
        @apply rounded;
    }

    .element1 {
        grid-column: 1;
        grid-row: 1;
    }
    .element2 {
        grid-column: 2;
        grid-row: 1;
    }
    .element3 {
        grid-column: 1;
        grid-row: 2;
    }
    .element4 {
        grid-column: 2;
        grid-row: 2;
    }
</style>
