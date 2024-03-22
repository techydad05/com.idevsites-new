<script>
    import postcss from "postcss";

    export let text = "";
</script>
<!-- <div class="grid"></div>
<div class="lines"></div> -->
<div class="absolute right-4 top-[20%] text-8xl">
    <h1>
      <span>RETRO</span>
      <span>RETRO</span>
    </h1>
    <h2>Text Effect</h2>
</div>
<!-- <div class="logo-container absolute pl-5 md:pl-0 md:relative">
    <div class="line bg-secondary"></div>
    <h1
        id="page-logo"
        class="shadow1 text-9xl md:text-[10rem] pl-4 pb-6 opacity-0"
    >
        {text}
    </h1>
    <h1>{text}</h1>
    <h2>testies</h2>
</div> -->

<style>
    @import url("https://fonts.googleapis.com/css2?family=Mr+Dafoe&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Exo:wght@900&display=swap");

    .lines {
        position: fixed;
        width: 100vw;
        height: 4em;
        background: linear-gradient(
            rgba(89, 193, 254, 0.2) 20%,
            #59c1fe 40%,
            #59c1fe 60%,
            rgba(89, 193, 254, 0.2) 80%
        );
        background-size: 1px 0.5em;
        box-shadow: 0 0 1em rgba(89, 193, 254, 0.4);
        transform: translateY(-1em);
        left: 0;
    }

    h1 {
        position: relative;
        font-family: "Exo";
        font-size: 7rem;
        margin: 0;
        transform: skew(-15deg);
        letter-spacing: 0.03em;
    }
    h1::after {
        content: "";
        position: absolute;
        top: -0.1em;
        right: 0.05em;
        width: 0.4em;
        height: 0.4em;
        background:
            radial-gradient(
                white 3%,
                rgba(255, 255, 255, 0.3) 15%,
                rgba(255, 255, 255, 0.05) 60%,
                transparent 80%
            ),
            radial-gradient(rgba(255, 255, 255, 0.2) 50%, transparent 60%) 50%
                50%/5% 100%,
            radial-gradient(rgba(255, 255, 255, 0.2) 50%, transparent 60%) 50%
                50%/70% 5%;
        background-repeat: no-repeat;
    }
    h1 span:first-child {
        display: block;
        text-shadow:
            0 0 0.1em #8ba2d0,
            0 0 0.2em black,
            0 0 5em #165ff3;
        -webkit-text-stroke: 0.06em rgba(0, 0, 0, 0.5);
    }
    h1 span:last-child {
        position: absolute;
        left: 0;
        top: 0;
        background-image: linear-gradient(
            #032d50 25%,
            #00a1ef 35%,
            white 50%,
            #20125f 50%,
            #8313e7 55%,
            #ff61af 75%
        );
        -webkit-text-stroke: 0.01em #94a0b9;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    h2 {
        font-family: "Mr Dafoe";
        margin: 0;
        font-size: 5.5rem;
        margin-top: -0.6em;
        color: white;
        text-shadow:
            0 0 0.05em #fff,
            0 0 0.2em #fe05e1,
            0 0 0.3em #fe05e1;
        transform: rotate(-7deg);
    }

    .grid {
        background: linear-gradient(
                transparent 65%,
                rgba(46, 38, 255, 0.4) 75%,
                #7d41e6 80%,
                rgba(46, 38, 255, 0.4) 85%,
                transparent 95%
            ),
            linear-gradient(
                90deg,
                transparent 65%,
                rgba(46, 38, 255, 0.4) 75%,
                #7d41e6 80%,
                rgba(46, 38, 255, 0.4) 85%,
                transparent 95%
            );
        background-size: 30px 30px;
        width: 200vw;
        height: 300vh;
        position: absolute;
        bottom: -120vh;
        transform: rotateX(-100deg);
        -webkit-mask-image: linear-gradient(black, rgba(0, 0, 0, 0) 80%);
    }

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
        animation: line-animation 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            infinite alternate;
    }
    .is-snapped .logo-container h1#page-logo {
        animation: clip-path-reveal-1 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            infinite alternate;
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
