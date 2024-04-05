<script>
    import { Slidy } from "@slidy/svelte";
    import { flip } from "@slidy/animation";
    import "@slidy/svelte/dist/slidy.css";
    import { fade, fly, slide } from "svelte/transition";
    const Plugins = import("@slidy/plugins");
    export let items = [];
    let slidyitem = items[0];
    let sushi = true;
    let food = false;
    let drinks = false;
    let single = true;
    let many = false;
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
        }
    };
</script>

<div class="item-carousel bg-primary p-4 flex items-center justify-center">
    {#await Plugins}
        <div class="flex w-full h-full justify-center items-center">
            <span class="loading loading-ring w-14"></span>
        </div>
    {:then Plugins}
        <div
            class="card card-side bg-base-100 shadow-xl flex-col md:max-w-[50vw]"
        >
            <div class="flex items-center justify-center my-2 gap-2 max-w-full">
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
                <button
                    class="btn"
                    on:click={() => setMenuSection("drinks")}>single</button
                >
                <button
                    class="btn"
                    on:click={() => setMenuSection("drinks")}>many</button
                >
            </div>
            <div class="menu-sections h-48">
                {#if sushi}
                    <div
                        in:fly={{ x: -500, delay: 350, duration: 400 }}
                        out:fly={{ x: 500 }}
                        class="w-full h-full bg-primary"
                    ></div>
                {:else if food}
                    <div
                        in:fly={{ x: -500, delay: 350, duration: 400 }}
                        out:fly={{ x: 500 }}
                        class="w-full h-full bg-secondary"
                    ></div>
                {:else if drinks}
                    <div
                        in:fly={{ x: -500, delay: 350, duration: 400 }}
                        out:fly={{ x: 500 }}
                        class="w-full h-full bg-accent"
                    ></div>
                {/if}
            </div>
            {#if single}
                <figure class="!justify-start flex-1">
                    <Slidy
                        --slidy-slide-width={"100%"}
                        --slidy-slide-height={"250px"}
                        on:index={(e) => (slidyitem = items[e.detail.index])}
                        getImgSrc={(item) => item.thumbnail}
                        slides={items}
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
                        {slidyitem?.title}
                    </h2>
                    <p class="text-2xl">{slidyitem?.description}</p>
                    <div class="card-actions justify-end p-4">
                        <button
                            on:click={() => location.assign(location.pathname)}
                            class="btn btn-primary">Go to</button
                        >
                    </div>
                </div>
            {/if}
        </div>
    {:catch error}
        {console.log(error)}
    {/await}
</div>
