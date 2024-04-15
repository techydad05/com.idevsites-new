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
    $: manyArr = chunkArray(currentProducts, 4);
    let index = 0;
    let singleItem = null;
    let single = false;
    let category = "";
    let productNum = 0;
    $: productNum = 0;
    let slideIndex = 0;

    const setSingle = (product) => {
        index = currentProducts.findIndex((p) => p.id === product.id);
        single = true;
        singleItem = product;
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

    function chunkArray(arr, chunkSize) {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    }
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
                    on:click={() => {
                        console.log(singleItem);
                        manyArr.findIndex((chunk) => {
                            console.log("chunk:", chunk);
                        })
                        singleItem = null;
                        single = false;
                    }}>Back</button
                >
            {/if}
        </div>
        {#if single}
            <div
                class="card card-side bg-base-100 shadow-xl flex-col h-[530px] w-[90%] md:w-1/2"
            >
                <figure class="!justify-start flex-1">
                    <Slidy
                        --slidy-slide-width={"100%"}
                        --slidy-slide-height={"250px"}
                        bind:index
                        let:item
                        on:index={(e) => {
                            index = e.detail.index;
                            console.log(index);
                            singleItem = currentProducts[index];
                        }}
                        getImgSrc={(item) => {
                            return singleItem.thumbnail;
                        }}
                        slides={currentProducts}
                        background={true}
                        counter={false}
                        arrows={false}
                        snap={"center"}
                        loop
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
                        <h1 class="mb-5 text-5xl font-bold">
                            No drinks here yet!
                        </h1>
                        <p class="mb-5 text-2xl">
                            ..but if you can make it in to see us we got you!
                        </p>
                    </div>
                </div>
            </div>
        {:else}
            <figure class="!justify-start flex-1">
                <Slidy
                    let:item
                    bind:slideIndex
                    getImgSrc={(item) => item?.thumbnail}
                    snap={"start"}
                    slides={manyArr}
                >
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="grid-container text-black">
                        {#each item as product}
                            <div
                                on:click={(e) => {
                                    setSingle(product)
                                }}
                                style={`background-image: url(${product?.thumbnail});`}
                                class={`bg-cover bg-center bg-no-repeat`}
                            >
                                <div class="h-full w-full relative">
                                    <h1
                                        class="absolute top-0 text-2xl font-extrabold text-center w-full bg-white/50"
                                    >
                                        {product?.title}
                                    </h1>
                                </div>
                            </div>
                        {/each}
                        {#if item.length < 4}
                            {#each Array(4 - item.length) as _}
                                <div
                                    class="skeleton w-full h-full rounded-none"
                                ></div>
                            {/each}
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
    :global(.slidy-counter) {
        top: unset;
        bottom: 1rem !important;
        right: 46%;
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
</style>
