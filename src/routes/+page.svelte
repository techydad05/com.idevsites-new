<script lang="ts">
  import type { PageData } from "./$types";
  import Collection from "$lib/components/Collection.svelte";
  // import { getVerticalScrollPercentage } from "$lib/utils";
  export let data: PageData;
  import DaisyCarousel from "$lib/components/DaisyUI/DaisyCarousel.svelte";
  // console.log("data:", data);
  

  let selectedAnimation = "slideInLeft";
  const animations = [
    { name: "Slide In Left", value: "slideInLeft" },
    { name: "Slide In Right", value: "slideInRight" },
    { name: "Slide In Up", value: "slideInUp" },
    { name: "Slide In Down", value: "slideInDown" },
    { name: "Fade In", value: "fadeIn" },
    { name: "Zoom In", value: "zoomIn" },
    { name: "Flip In X", value: "flipInX" },
    { name: "Bounce In", value: "bounceIn" },
    { name: "Rotate In", value: "rotateIn" },
  ];

  const slides = [
    {
      name: "John Doe",
      text: "MyWebsite is simply amazing! The best experience I've ever had.",
      img: "https://picsum.photos/80/80",
    },
    {
      name: "Jane Smith",
      text: "A life-changing experience! Highly recommend to everyone.",
      img: "https://picsum.photos/80/80",
    },
    {
      name: "Alice Johnson",
      text: "I highly recommend MyWebsite! Outstanding service and support.",
      img: "https://picsum.photos/80/80",
    },
  ];

  let scrolled;
  function getScrollPercent() {
    let h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    scrolled = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    // console.log(scrolled);
    return scrolled;
  }
</script>

<svelte:window on:scroll={() => getScrollPercent()} />

<div class="min-h-screen flex flex-col">
  <!-- Hero Section -->
  <div
    class="hero min-h-screen"
    style="background-image: url('https://picsum.photos');"
  >
    <div
      class="hero-overlay bg-opacity-70 bg-gradient-to-r from-purple-900 to-red-900"
    ></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md mt-24">
        <h1 class="mb-5 text-6xl font-bold">Welcome to My Website</h1>
        <p class="mb-5 text-xl">
          Your one-stop solution for all your tech needs. Join us and explore
          the endless possibilities.
        </p>
        <button class="btn btn-primary btn-lg">Get Started</button>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="p-10 bg-base-200">
    <h2 class="text-4xl font-bold text-center mb-10">Features</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div
        class="bg-base-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <h3 class="text-2xl font-semibold mb-4">Feature One</h3>
        <p>
          Discover the amazing feature one which helps you achieve greatness.
        </p>
      </div>
      <div
        class="bg-base-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <h3 class="text-2xl font-semibold mb-4">Feature Two</h3>
        <p>Explore feature two to maximize your efficiency and productivity.</p>
      </div>
      <div
        class="bg-base-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <h3 class="text-2xl font-semibold mb-4">Feature Three</h3>
        <p>Experience the power of feature three in your daily tasks.</p>
      </div>
    </div>
  </div>

  <!-- Testimonials Section -->
  <div class="p-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
    <h2 class="text-4xl font-bold text-center mb-10 text-white">
      Testimonials
    </h2>
    <div class="flex flex-col">
      <div class="p-10 bg-base-200">
        <div class="mb-5 relative">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="block text-lg font-semibold mb-2"
            >Select Animation:</label
          >
          <select
            bind:value={selectedAnimation}
            class="select select-bordered w-full max-w-xs"
          >
            {#each animations as animation}
              <option value={animation.value}>{animation.name}</option>
            {/each}
          </select>
          </div>
          <div class="relative">
             <DaisyCarousel {slides} animation={selectedAnimation} />
          </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <!-- <footer class="footer p-10 bg-base-200 text-base-content">
    <div>
      <span class="footer-title">Services</span>
      <a class="link link-hover" href="#branding">Branding</a>
      <a class="link link-hover" href="#design">Design</a>
      <a class="link link-hover" href="#marketing">Marketing</a>
      <a class="link link-hover" href="#advertisement">Advertisement</a>
    </div>
    <div>
      <span class="footer-title">Company</span>
      <a class="link link-hover" href="#about-us">About us</a>
      <a class="link link-hover" href="#contact">Contact</a>
      <a class="link link-hover" href="#jobs">Jobs</a>
      <a class="link link-hover" href="#press-kit">Press kit</a>
    </div>
    <div>
      <span class="footer-title">Legal</span>
      <a class="link link-hover" href="#terms-of-use">Terms of use</a>
      <a class="link link-hover" href="#privacy-policy">Privacy policy</a>
      <a class="link link-hover" href="#cookie-policy">Cookie policy</a>
    </div>
  </footer> -->
</div>

<Collection products={data.products} />
<!-- {#each data.products as product}
   <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
   </div>
{:else}
   No products found.
{/each} -->
