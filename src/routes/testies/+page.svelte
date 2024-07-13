<script>

  import { Facebook, Instagram, Soup, Twitter } from "lucide-svelte";

</script>
<!-- <script>
    import ImageGallery from "./ImageGallery.svelte";
    import MorphingSvg from "./MorphingSVG.svelte";
  </script>
  <div>
    going to work on getting openai installed in the site for some testing of creating web elements
    <ImageGallery />
  </div> -->
<!-- <script>
  import OpenAiComponent from "$src/lib/components/openai/OpenAIComponent.svelte";
  export let data;
</script>

<OpenAiComponent user={data.user} />

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">GPT 4o</h1>
  <div id="responseTarget" class="w-full h-[80vh] flex flex-col"></div>
</div> -->

<header class="bg-black text-white p-4">
  <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-2xl font-bold">DJ Neon Vibes</h1>
    <nav>
      <ul class="flex space-x-4">
        <!-- <li><Link to="/" class="hover:underline">Home</Link></li>
        <li><Link to="/about" class="hover:underline">About</Link></li>
        <li><Link to="/music" class="hover:underline">Music</Link></li>
        <li><Link to="/events" class="hover:underline">Events</Link></li>
        <li><Link to="/contact" class="hover:underline">Contact</Link></li> -->
      </ul>
    </nav>
  </div>
</header>
<section class="hero min-h-screen bg-cover bg-center" style="background-image: url('/img/dj-hero-bg.webp');">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Feel the Beat</h1>
      <p class="mb-5">Join DJ Neon Vibes for an unforgettable musical journey.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</section>
<section class="bg-gray-900 text-white py-16">
  <div class="container mx-auto flex flex-col lg:flex-row items-center">
    <div class="mb-10 lg:mb-0">
      <img src="/img/dj-about.webp" alt="DJ Neon Vibes" class="rounded-lg shadow-2xl" />
    </div>
    <div class="lg:w-1/2 lg:pl-10">
      <h2 class="text-3xl font-bold mb-4">About DJ Neon Vibes</h2>
      <p class="mb-6">
        DJ Neon Vibes is an electrifying DJ and solo music maker known for his unique sound and unforgettable performances. With a passion for music and a talent for mixing beats, he has taken the music scene by storm.
      </p>
    </div>
  </div>
</section>
<section class="bg-black text-white py-16">
  <div class="container mx-auto text-center">
    <h2 class="text-3xl font-bold mb-8">Latest Tracks</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card bg-gray-800 shadow-xl">
        <figure>
          <img src="/img/track1.webp" class="w-1/2 mt-4" alt="Track 1" />
        </figure>
        <div class="card-body">
          <h3 class="card-title">Track Title 1</h3>
          <audio controls class="w-full mt-4">
            <source type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <div class="card bg-gray-800 shadow-xl">
        <figure>
          <img src="/img/track1.webp" class="w-1/2 mt-4" alt="Track 2" />
        </figure>
        <div class="card-body">
          <h3 class="card-title">Track Title 2</h3>
          <audio controls class="w-full mt-4">
            <source type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <!-- Add more tracks similarly -->
    </div>
  </div>
</section>
<section class="bg-gray-900 text-white py-16">
  <div class="container mx-auto text-center">
    <div class="bg-[url(/img/events.webp)] bg-cover h-[500px] relative">
      <h2 class="text-5xl font-bold ml-1 absolute bottom-2/4 left-14 drop-shadow-2xl">Upcoming</h2>
      <h2 class="text-9xl font-bold absolute bottom-1/4 left-14 drop-shadow-2xl">Events</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card bg-gray-800 shadow-xl mt-8">
        <div class="card-body">
          <h3 class="card-title">Event Title 1</h3>
          <p>Date: July 25, 2024</p>
          <p>Location: Club X, City Y</p>
        </div>
      </div>
      <div class="card bg-gray-800 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Event Title 2</h3>
          <p>Date: August 5, 2024</p>
          <p>Location: Club Z, City A</p>
        </div>
      </div>
      <!-- Add more events similarly -->
    </div>
  </div>
</section>
<section class="bg-black text-white py-16">
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">Contact</h2>
    <div class="w-full flex flex-col items-center">
      <form class="w-2/3 max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-white">Name</span>
          </label>
          <input type="text" placeholder="Your Name" class="input input-bordered w-full" />
        </div>
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-white">Email</span>
          </label>
          <input type="email" placeholder="Your Email" class="input input-bordered w-full" />
        </div>
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text text-white">Message</span>
          </label>
          <textarea placeholder="Your Message" class="textarea textarea-bordered w-full"></textarea>
        </div>
        <div class="form-control">
          <button class="btn btn-primary w-full">Send</button>
        </div>
      </form>
      <div class="lg:w-1/2 text-center">
        <h3 class="text-2xl font-bold my-4">Follow Me</h3>
        <div class="flex space-x-4 justify-center">
          <a href="#" class="text-2xl hover:text-primary"><Facebook /></a>
          <a href="#" class="text-2xl hover:text-primary"><Twitter /></a>
          <a href="#" class="text-2xl hover:text-primary"><Instagram /></a>
          <a href="#" class="text-2xl hover:text-primary"><Soup /></a>
        </div>
      </div>
    </div>
  </div>
</section>
<footer class="bg-gray-900 text-white p-4">
  <div class="container mx-auto text-center">
    <p>&copy; 2024 DJ Neon Vibes. All rights reserved.</p>
    <ul class="flex justify-center space-x-4 mt-2">
      <li><a href="/" class="hover:underline">Home</a></li>
      <li><a href="/about" class="hover:underline">About</a></li>
      <li><a href="/music" class="hover:underline">Music</a></li>
      <li><a href="/events" class="hover:underline">Events</a></li>
      <li><a href="/contact" class="hover:underline">Contact</a></li>
    </ul>
  </div>
</footer>

