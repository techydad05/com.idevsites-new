<!-- needs fonts codepen: https://codepen.io/techydad05/pen/GRLmwmQ (neon text-shadow effect) -->
<script>
    import { onMount } from "svelte";
    export let text = "";
    export let sign = "";
    export let list = false;
    export let classes = "";

    onMount(() => {
        const signs = document.querySelectorAll("x-sign");
        const randomIn = (min, max) =>
            Math.floor(Math.random() * (max - min + 1) + min);

        const mixupInterval = (el) => {
            const ms = randomIn(2000, 4000);
            el.style.setProperty("--interval", `${ms}ms`);
        };

        signs.forEach((el) => {
            mixupInterval(el);
            el.addEventListener("webkitAnimationIteration", () => {
                mixupInterval(el);
            });
        });
    });
</script>

<x-sign class={`${sign}`}>{text}</x-sign>
{#if list}
    <img src="/neon_signs.jpeg" alt="" />
{/if}

{#if sign === "one"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Gruppo");
    </style>
{:else if sign === "two"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Bad+Script&");
    </style>
{:else if sign === "three"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Kumar+One+Outline");
    </style>
{:else if sign === "four"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Londrina+Outline");
    </style>
{:else if sign === "five"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Sriracha");
    </style>
{:else if sign === "six"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Bad+Script&family=Yellowtail");
    </style>
{:else if sign === "seven"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Bad+Script&family=Bad+Script");
    </style>
{:else if sign === "eight"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Bad+Script&family=Monoton");
    </style>
{:else if sign === "nine"}
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Bad+Script&family=Sriracha");
    </style>
{/if}

<style lang="postcss">
    x-sign {
        --interval: 1s;
        display: block;
        text-shadow:
            0 0 10px var(--color1),
            0 0 20px var(--color2),
            0 0 40px var(--color3),
            0 0 80px var(--color4);
        will-change: filter, color;
        filter: saturate(60%);
        animation: flicker steps(100) var(--interval) 1s infinite;
    }

    x-sign.one {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Gruppo;
    }

    x-sign.two {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Bad Script;
    }

    x-sign.three {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Kumar One Outline;
    }

    x-sign.four {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Londrina Outline;
        text-shadow: black -7px 7px;
    }

    x-sign.five {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Sriracha;
    }

    x-sign.six {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Yellowtail;
    }

    x-sign.seven {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Bad Script;
    }

    x-sign.eight {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Monoton;
    }

    x-sign.nine {
        color: oklch(var(--p));
        --color1: color-mix(in srgb, oklch(var(--p)), #000 35%);
        --color2: color-mix(in srgb, oklch(var(--p)), #000 15%);
        --color3: oklch(var(--ac));
        --color4: oklch(var(--n));
        font-family: Sriracha;
    }

    @keyframes flicker {
        50% {
            color: oklch(var(--s));
            filter: saturate(200%) hue-rotate(20deg);
        }
    }
</style>
