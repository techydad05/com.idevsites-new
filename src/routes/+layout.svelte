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
<div data-theme='ACTIVECLASS'>
   <Toaster />
   {#if naked}
      <slot />
   {:else}
    <NavBar bind:user bind:cart bind:count />
    <slot />
    <Footer />
   {/if}
</div>































