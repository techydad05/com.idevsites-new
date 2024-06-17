<script>
    import { onMount } from "svelte";
  
    export let slides = [];
    export let animation = "slideInLeft";
  
    let currentSlide = 0;
  
    function showSlide(index) {
      if (typeof document !== 'undefined') {
        const slideElements = document.querySelectorAll('.carousel-item');
        slideElements.forEach((slide, i) => {
          slide.classList.remove('active', 'prev', 'next', 'fadeIn', 'zoomIn', 'flipInX', 'bounceIn', 'rotateIn', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideInDown');
          slide.classList.add(animation);
          slide.classList.toggle('hidden', i !== index);
          slide.classList.toggle('block', i === index);
        });
        currentSlide = index;
      }
    }
  
    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }
  
    function prevSlide() {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
    }
  
    onMount(() => {
      showSlide(currentSlide);
    });
  
    $: animation, showSlide(currentSlide);
  </script>
  
  <div class="relative">
    <div class="carousel w-full relative">
        {#each slides as slide, i}
          <div class="carousel-item w-full hidden">
            <div
              class="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto"
            >
              <img class="h-16 w-16 rounded-full mb-4" src={slide.img} alt="User" />
              <div class="text-center">
                <p class="text-lg font-semibold mb-1">{slide.name}</p>
                <p class="text-gray-500">{slide.text}</p>
              </div>
            </div>
          </div>
        {/each}
        
      </div>
      <div class="flex w-full justify-between absolute transform -translate-y-1/2">
        <button
          on:click={prevSlide}
          class="btn btn-circle btn-primary"
          >❮</button
        >
        <button
          on:click={nextSlide}
          class="btn btn-circle btn-primary"
          >❯</button
        >
      </div>
  </div>
  <!-- <div class="flex justify-center w-full py-2 gap-2">
    {#each slides as _, i}
      <button on:click={() => showSlide(i)} class="btn btn-xs">{i + 1}</button>
    {/each}
  </div> -->
  
  <style>
    .carousel-item {
      opacity: 0;
      transition:
        opacity 0.5s ease,
        transform 0.5s ease;
    }
    :global(.carousel-item.block) {
      opacity: 1;
    }
  
    /* Slide Animations */
    :global(.slideInLeft) {
      animation: slideInLeft 0.5s ease;
    }
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  
    :global(.slideInRight) {
      animation: slideInRight 0.55s ease-in-out;
    }
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
  
    :global(.slideInUp) {
      animation: slideInUp 0.5s ease;
    }
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  
    :global(.slideInDown) {
      animation: slideInDown 0.5s ease;
    }
    @keyframes slideInDown {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }
  
    :global(.fadeIn) {
      animation: fadeIn 0.5s ease;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
    :global(.zoomIn) {
      animation: zoomIn 0.5s ease;
    }
    @keyframes zoomIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  
    :global(.flipInX) {
      animation: flipInX 0.5s ease;
    }
    @keyframes flipInX {
      from {
        transform: rotateX(90deg);
        opacity: 0;
      }
      to {
        transform: rotateX(0);
        opacity: 1;
      }
    }
  
    :global(.bounceIn) {
      animation: bounceIn 0.5s ease;
    }
    @keyframes bounceIn {
      from,
      20%,
      40%,
      60%,
      80%,
      to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
      }
      20% {
        transform: scale3d(1.1, 1.1, 1.1);
      }
      40% {
        transform: scale3d(0.9, 0.9, 0.9);
      }
      60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
      }
      80% {
        transform: scale3d(0.97, 0.97, 0.97);
      }
      to {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  
    :global(.rotateIn) {
      animation: rotateIn 0.5s ease;
    }
    @keyframes rotateIn {
      from {
        transform: rotate(-200deg);
        opacity: 0;
      }
      to {
        transform: rotate(0);
        opacity: 1;
      }
    }
  </style>
  