<script>
    export let text = "";
    export let animate = false;
</script>

<div
    class="logo-container absolute pl-5 md:pl-0 md:relative"
>
    <div class="line bg-accent"></div>
    <h1 id="page-logo">
        {text}
    </h1>
</div>
<style>
    .line {
        position: absolute;
        top: calc(100% - 2px);
        left: 20px;
        width: 90%;
        height: 4px;
        /* background-color: #cf0000; */
        transform-origin: center center;
        transform: scaleX(0);
    }
    .logo-container h1#page-logo {
        font:
            bold 6rem "Arial",
            sans-serif;
    }
    /* .is-snapped .logo-container:before { */
    .is-snapped .logo-container .line {
        animation: line-animation 2.5s ease infinite alternate;
    }
    .is-snapped .logo-container h1#page-logo {
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
