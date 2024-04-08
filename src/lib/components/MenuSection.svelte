<script>
    import { flip } from "@slidy/animation";
    import { fade, fly, slide } from "svelte/transition";
    import { Slidy } from "@slidy/svelte";
    import "@slidy/svelte/dist/slidy.css";
    import { createImageGroups } from "../utils";
    import { stringify } from "postcss";
    const Plugins = import("@slidy/plugins");
    export let storeData = {};
    console.log("categories", storeData.categories);
    let manyArr = [];
    $: manyArr = createImageGroups(storeData.products);
    let singleItem = storeData.products[0];
    let sushi = true;
    let food = false;
    let drinks = false;
    let single = false;
    let many = true;
    let index = 0;

    const setSingle = (el) => {
        console.log(el.id);
        singleItem = storeData.products[el.id];
        many = false;
        single = true;
    };

    const setMenuSection = (section) => {
        switch (section) {
            case "sushi":
                food = false;
                drinks = false;
                sushi = true;
                break;
            case "food":
                sushi = false;
                drinks = false;
                food = true;
                break;
            case "drinks":
                sushi = false;
                food = false;
                drinks = true;
                break;
            // case "single":
            //     many = false;
            //     single = !single;
            //     break;
            case "many":
                single = false;
                many = !many;
                break;
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
        <div class="w-full bg-accent">
            <button
                class="btn btn-lg btn-secondary"
                on:click={() => setMenuSection("sushi")}>Sushi</button
            >
            <button
                class="btn btn-lg btn-secondary"
                on:click={() => setMenuSection("food")}>Food</button
            >
            <button
                class="btn btn-lg btn-secondary"
                on:click={() => setMenuSection("drinks")}>Drinks</button
            >
            {#if single}
                <button
                    class="btn btn-lg btn-secondary"
                    on:click={() => setMenuSection("many")}>Back</button
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
                        slides={storeData.products}
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
                            on:click={() => location.assign(location.pathname)}
                            class="btn btn-primary">Go to</button
                        >
                    </div>
                </div>
            </div>
        {:else if many}
            <figure class="!justify-start flex-1">
                <Slidy
                    bind:index
                    let:item
                    getImgSrc={(index) => storeData.products[index]?.thumbnail}
                    snap={"start"}
                    slides={manyArr}
                >
                    <div class="grid-container text-black">
                        <div
                            on:click={(e) => setSingle(e.currentTarget)}
                            id={item.id1}
                            style={`background-image: url(${storeData.products[item.id1].thumbnail});`}
                            class="element1 bg-cover bg-center bg-no-repeat"
                        ></div>
                        <div
                            on:click={(e) => setSingle(e.currentTarget)}
                            id={item.id2}
                            style={`background-image: url(${storeData.products[item.id2].thumbnail});`}
                            class="element2 bg-cover bg-center bg-no-repeat"
                        ></div>
                        <div
                            on:click={(e) => setSingle(e.currentTarget)}
                            id={item.id3}
                            style={`background-image: url(${storeData.products[item.id3].thumbnail});`}
                            class="element3 bg-cover bg-center bg-no-repeat"
                        ></div>
                        <div
                            on:click={(e) => setSingle(e.currentTarget)}
                            id={item.id4}
                            style={`background-image: url(${storeData.products[item.id4].thumbnail});`}
                            class="element4 bg-cover bg-center bg-no-repeat"
                        ></div>
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
