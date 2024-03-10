<script>
  // @ts-nocheck

  import EmblaCarousel from "embla-carousel";
  import Autoplay from "embla-carousel-autoplay";
  // work on adding this back in
  // import {
  //   addPlayBtnListeners,
  //   addNavBtnListeners
  // } from './EmblaCarouselAutoplay'
  import {
    setupTweenParallax,
    addDotBtnsAndClickHandlers,
    addPrevNextBtnsClickHandlers,
  } from "../carousel-helpers/carousel-helpers.js";
  import "../carousel-helpers/carousel-helpers.css";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  let imgHeight = 0;

  const OPTIONS = { dragFree: false, loop: true };

  onMount(() => {
    const emblaNode = document.querySelector(".embla");
    const viewportNode = emblaNode?.querySelector(".embla__viewport");
    const prevBtn = emblaNode?.querySelector(".embla__button--prev");
    const nextBtn = emblaNode?.querySelector(".embla__button--next");
    const dotsNode = document.querySelector(".embla__dots");
    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
      Autoplay({ playOnInit: true, delay: 3000 }),
    ]);
    const removeTweenParallax = setupTweenParallax(emblaApi);

    const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
      emblaApi,
      prevBtn,
      nextBtn,
    );
    const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
      emblaApi,
      dotsNode,
    );

    emblaApi
      .on("destroy", removeTweenParallax)
      .on("destroy", removePrevNextBtnsClickHandlers)
      .on("destroy", removeDotBtnsAndClickHandlers);
  });


  const slides = [
    {
      img: "volcano.png",
      text: "Sushi, Tapas, & More"
    },
    {
      img: "billiards.png",
      text: "Billiards Anyone?"
    },
    {
      img: "mimosa.png",
      text: "Brunch with Us"
    },
    {
      img: "tikis.png",
      text: "Potent Tikis and Cocktails"
    },
  ]
</script>

<div bind:clientHeight={imgHeight} class="h-[80vh] mt-[20vh] overflow-hidden">
  <div class="embla relative max-w-none h-full">
    <div class="embla__viewport">
      <div class="embla__container">
        {#each slides as slide}
          <div class="embla__slide bg-gradient-to-t from-base-100 to-accent">
            <div class="embla__parallax">
              <div
                class="embla__parallax__layer flex items-center"
              >
                <img
                  class="embla__slide__img embla__parallax__img w-full md:w-1/2 rounded-none"
                  src={slide.img}
                  alt="pool tables"
                  style={`height:${imgHeight}px`}
                />
                <h1 class="font-normal text-pretty text-primary-accent/70 p-4 text-[6rem] md:text-[7rem] lg:text-[9rem] absolute md:relative leading-tight"
                  style="text-shadow: -1px 1px 1px black;">
                  {slide.text}
                </h1>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="embla__controls absolute top-0 right-0">
      <div class="embla__buttons">
        <button class="embla__button embla__button--prev" type="button">
          <svg class="embla__button__svg" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            ></path>
          </svg></button
        ><button class="embla__button embla__button--next" type="button">
          <svg class="embla__button__svg" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="embla__dots"></div>
    </div>
  </div>
</div>

<!-- <div class="embla__slide">
  <div class="embla__parallax">
    <div class="embla__parallax__layer">
      <img
        class="embla__slide__img embla__parallax__img"
        src="https://picsum.photos/600/350?v=2"
        alt="Your alt text"
      />
    </div>
  </div>
</div>
<div class="embla__slide">
  <div class="embla__parallax">
    <div class="embla__parallax__layer">
      <img
        class="embla__slide__img embla__parallax__img"
        src="https://picsum.photos/600/350?v=3"
        alt="Your alt text"
      />
    </div>
  </div>
</div>
<div class="embla__slide">
  <div class="embla__parallax">
    <div class="embla__parallax__layer">
      <img
        class="embla__slide__img embla__parallax__img"
        src="https://picsum.photos/600/350?v=4"
        alt="Your alt text"
      />
    </div>
  </div>
</div>
<div class="embla__slide">
  <div class="embla__parallax">
    <div class="embla__parallax__layer">
      <img
        class="embla__slide__img embla__parallax__img"
        src="https://picsum.photos/600/350?v=5"
        alt="Your alt text"
      />
    </div>
  </div>
</div> -->

<style>
  .embla {
    /* max-width: 48rem; */
    margin: auto;
    --slide-height: 100%;
    --slide-spacing: 1rem;
    --slide-size: 100%;
  }
  .embla__viewport {
    overflow: hidden;
  }
  .embla__container {
    backface-visibility: hidden;
    display: flex;
    touch-action: pan-y;
    margin-left: calc(var(--slide-spacing) * -1);
  }
  .embla__slide {
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
  .embla__slide__img {
    /* border-radius: 1.8rem; */
    /* display: block; */
    /* height: var(--slide-height); */
    /* width: 100%; */
    /* object-fit: cover; */
  }
  .embla__parallax__layer h1 {
    width: 50%;
    float: left;
  }
  .embla__parallax__img {
    max-width: none;
    object-fit: cover;
    float: left;
  }
  .embla__controls {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    gap: 1.2rem;
    margin-top: 1.8rem;
  }
  .embla__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    align-items: center;
  }
  .embla__button {
    -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    touch-action: manipulation;
    display: inline-flex;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    padding: 0;
    margin: 0;
    box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
    width: 3.6rem;
    height: 3.6rem;
    z-index: 1;
    border-radius: 50%;
    color: var(--text-body);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .embla__button:disabled {
    color: var(--detail-high-contrast);
  }
  .embla__button__svg {
    width: 35%;
    height: 35%;
  }
  .embla__dots {
    /* display: flex; */
    display: none;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
  }
  .embla__dot {
    -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    touch-action: manipulation;
    display: inline-flex;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    padding: 0;
    margin: 0;
    width: 2.6rem;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .embla__dot:after {
    box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    content: "";
  }
  .embla__dot--selected:after {
    box-shadow: inset 0 0 0 0.2rem var(--text-body);
  }
  .embla__parallax {
    /* border-radius: 1.8rem; */
    height: 100%;
    overflow: hidden;
    display: flex;
  }
  .embla__parallax__layer {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
