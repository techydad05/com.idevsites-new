<script>
  import { goto } from "$app/navigation";

  export let text;
  export let link = "#";
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">{text}</p>
      <button on:click={() => goto(link)} class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>