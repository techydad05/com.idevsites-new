<script>
    export let text = "";
    export let animate = false;
</script>

<div class="logo-container {animate ? 'animated' : ''}">
    <h1 id="page-logo">
        {text}
    </h1>
</div>
<!-- <button class="absolute bottom-0 left-0" on:click={() => animate = !animate}>animated!</button> -->
<style>
    .logo-container {
        position: relative;
    }
    .logo-container:before {
        content: "";
        position: absolute;
        top: calc(100% - 2px);
        width: 100%;
        height: 4px;
        background-color: #cf0000;
        transform-origin: center center;
        transform: scaleX(0);
    }
    .logo-container h1#page-logo {
        font:
            bold 6rem "Arial",
            sans-serif;
    }
    .animated.logo-container:before {
        animation: line-animation 2.5s ease infinite alternate;
    }
    .animated.logo-container h1#page-logo {
        animation: clip-path-reveal-1 2.5s ease infinite alternate;
    }

    @keyframes line-animation {
        0% {
            transform: scaleX(0);
        }
        15% {
            transform: scaleX(0);
        }
        20%,
        25% {
            transform: scaleX(1);
            top: calc(100% - 2px);
        }
        50% {
            transform: scaleX(1);
            top: 0px;
        }
        70% {
            transform: scaleX(0.2);
            top: 0px;
        }
        80%,
        100% {
            transform: scaleX(0.2);
            top: 0px;
        }
    }
    @keyframes clip-path-reveal-1 {
        0%,
        25% {
            clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
        }
        50% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
    }
</style>
