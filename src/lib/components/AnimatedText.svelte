<script>
    export let text = "";
</script>

<div
    class="logo-container absolute pl-5 md:pl-0 md:relative"
>
    <div class="line bg-secondary"></div>
    <h1 id="page-logo" class="text-9xl md:text-[10rem] pl-4 pb-6 opacity-0">
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
        transform-origin: center center;
        transform: scaleX(0);
    }
    .is-snapped .logo-container .line {
        animation: line-animation 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate;
    }
    .is-snapped .logo-container h1#page-logo {
        animation: clip-path-reveal-1 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate;
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
            opacity: 1;
            clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
        }
        50% {
            opacity: 1;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
        100% {
            opacity: 1;
        }
    }
</style>
