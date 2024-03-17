<!-- check on this -->
<svelte:options immutable={true} />

<script>
    import { RotateCw, Play, Pause } from "lucide-svelte"
    import { slidy } from "@slidy/core";
    import { play } from "@slidy/plugins"
    import * as animations from "@slidy/animation";
    import * as easings from "@slidy/easing";
    import { getPhotos } from "./api.js";
    import Dots from "./Dots.svelte";
    // todo: consider adding these back in
    // import pkg from '@slidy/core/package.json'
    // import Git from './Git.svelte'
    export let builder = false;
    export let items = [
            { src: "mimosa.png", width: "90vw", height: "405px" },
            { src: "volcano.png", width: "90vw", height: "405px" },
            { src: "tikis.png", width: "90vw", height: "405px" },
        ],
        index = 4,
        length = 9,
        position = 0,
        easing = easings.sine,
        animation = animations.flip,
        snap = "center",
        flow = "row",
        width = "auto",
        height = "375px",
        axis = "x",
        played = false,
        timer = 2000,
        duration = 475,
        loop = false;

    const snaps = ["unset", "start", "center", "end", "deck"],
        flows = ["row", "row-reverse", "column", "column-reverse"],
        axises = ["x", "y"];

    function onMove(e) {
        index = e.detail.index;
        position = e.detail.position;
    }

    function reload() {
        page = Math.trunc(Math.random() * 100);
    }

    // function playB() {
    //     played = !played;
    //     if (timer) clearInterval(timer);
    //     timer = played
    //         ? setInterval(() => {
    //               if (!loop && index === length - 1) {
    //                   clearInterval(timer);
    //                   played = !played;
    //               }
    //               index++;
    //           }, duration)
    //         : 0;
    // }

    function looping() {
        loop = !loop;
    }
</script>

<!-- <h1>{pkg.name}@{pkg.version} <Git /></h1> -->
<section style:--flow={flow} style:--width={width} style:--height={height}>
    <!-- {#await getPhotos(length) then items} -->
    <ul
        tabindex="0"
        role="listbox"
        use:slidy={{
            index,
            clamp: 0,
            indent: 1,
            sensity: 2.5,
            gravity: 1.2,
            duration,
            animation,
            easing,
            axis,
            snap,
            loop,
        }}
        on:move={onMove}
    >
        {#each items as item, i}
            <li
                id={i}
                class:active={i === index}
                style={`width: ${item.width} !important;height: ${item.height} !important;`}
            >
                <img alt={i} loading="lazy" src={item.src} />
            </li>
        {/each}
    </ul>
    <!-- {/await} -->
</section>

{#if builder }
    <p>index: [<b>{index}</b>] position: <b>{Math.trunc(position)}</b>px</p>
    <br>
    <Dots bind:index bind:length />
    
    <nav>
        <label
            >Axis
            <select class="select select-primary" bind:value={axis}>
                {#each axises as axis}
                    <option>{axis}</option>
                {/each}
            </select>
        </label>
        <label
            >Animation
            <select class="select select-primary" bind:value={animation}>
                {#each Object.entries(animations) as [k, v]}
                    <option value={v}>{k}</option>
                {/each}
            </select>
        </label>
        <label
            >Easing
            <select class="select select-primary" bind:value={easing}>
                {#each Object.entries(easings) as [k, v]}
                    <option value={v}>{k}</option>
                {/each}
            </select>
        </label>
        <label
            >Duration
            <input
                class="input input-sm input-primary"
                bind:value={duration}
                type="number"
            />
        </label>
    </nav>
    
    <nav>
        <label
            >Flow
            <select class="select select-primary" bind:value={flow}>
                {#each flows as flow}
                    <option>{flow}</option>
                {/each}
            </select>
        </label>
        <label
            >Width
            <input
                class="input input-sm input-primary"
                bind:value={width}
                type="text"
            />
        </label>
        <label
            >Height
            <input
                class="input input-sm input-primary"
                bind:value={width}
                type="text"
            />
        </label>
        <label
            >Snap
            <select class="select select-primary" bind:value={snap}>
                {#each snaps as snap}
                    <option>{snap}</option>
                {/each}
            </select>
        </label>
    </nav>
    
    <nav>
        <button class="btn btn-secondary" on:click={looping} class:active={loop}>loop</button>
        <button class="btn btn-secondary" on:click={reload}><RotateCw />reload</button>
        {#if played }
        <button class="btn btn-secondary" on:click={playB} class:active={played}
        ><Pause/></button>
        {:else}  
        <button class="btn btn-secondary" on:click={playB} class:active={played}
        ><Play/></button>  
        {/if}
    </nav>
    <code class="block p-4 w-full text-center bg-base-200 outline">
        {`<Slidy 
        duration={${duration}}
        easing={${Object.entries(easings).find((v) => v[1] === easing)[0]}}
        }></Slidy>`}
    </code>
{/if}

<style>
    section {
        overflow: hidden;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: var(--flow) nowrap;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        height: 100%;
    }
    ul li {
        flex: 1 0 auto;
        width: auto;
        max-width: 100%;
        max-height: calc(100% - 2rem);
        height: 100%;
        position: relative;
        background: whitesmoke;
    }
    ul li:before {
        content: attr(id);
        position: absolute;
        bottom: 0;
        padding: 0.75rem 1rem;
        z-index: 1;
    }
    ul li img {
        width: 100%;
        width: auto;
        height: 100%;
        display: flex;
        object-fit: cover;
        max-width: 100%;
    }
    :global(nav) {
        display: flex;
        justify-content: center;
        margin: 1rem 0;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
    }
    .active,
    b {
        color: red;
    }
    h1,
    p {
        text-align: center;
    }
    :global(body) {
        padding: 0;
    }
</style>
