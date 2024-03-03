<script lang="ts">
   import "$src/app.postcss";
   import type { PageData } from "./$types";
   import { page } from "$app/stores";
   import NavBar from "$lib/components/NavBar.svelte";
   import Footer from "$lib/components/Footer.svelte";
   import Toaster from "$lib/components/Toaster.svelte";
   export let data: PageData;
   const nakedPaths = ["/auth", "/checkout", "/sitemap.xml"];
   $: naked = nakedPaths.includes($page?.url?.pathname);
   $: user = data?.user;
   $: cart = data?.cart;
   $: count = cart?.items?.length || null;

   import { onMount } from 'svelte'

   // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
   onMount(() => {
      themeChange(false)
      // 👆 false parameter is required for svelte
   })
</script>
<div data-theme='ACTIVECLASSs'>
   <Toaster />
   
   {#if naked}
      <slot />
   {:else}
   <select data-choose-theme>
      <option value="">Pick Theme</option>
      <option value="dark">Dark</option>
      <option value="
light">
light</option>
      <option value="dark">dark</option>
      <option value="cupcake">cupcake</option>
      <option value="bumblebee">bumblebee</option>
      <option value="emerald">emerald</option>
      <option value="corporate">corporate</option>
      <option value="synthwave">synthwave</option>
      <option value="retro">retro</option>
      <option value="cyberpunk">cyberpunk</option>
      <option value="valentine">valentine</option>
      <option value="halloween">halloween</option>
      <option value="garden">garden</option>
      <option value="forest">forest</option>
      <option value="aqua">aqua</option>
      <option value="lofi">lofi</option>
      <option value="pastel">pastel</option>
      <option value="fantasy">fantasy</option>
      <option value="wireframe">wireframe</option>
      <option value="black">black</option>
      <option value="luxury">luxury</option>
      <option value="dracula">dracula</option>
      <option value="cmyk">cmyk</option>
      <option value="autumn">autumn</option>
      <option value="business">business</option>
      <option value="acid">acid</option>
      <option value="lemonade">lemonade</option>
      <option value="night">night</option>
      <option value="coffee">coffee</option>
      <option value="winter">winter</option>
      <option value="dim">dim</option>
      <option value="nord">nord</option>
      <option value="sunset">sunset</option>

    </select> 
    <NavBar bind:user bind:cart bind:count />
    <slot />
    <Footer />
   {/if}
</div>































