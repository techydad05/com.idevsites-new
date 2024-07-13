<script lang="ts">
  import "$src/app.postcss";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import NavBar from "$lib/components/NavBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  // remove this maybe?
  import Toaster from "$lib/components/Toaster.svelte";
  // ^
  import ToastContainer from "$src/lib/components/DaisyUI/DaisyToast/ToastContainer.svelte";
  export let data: PageData;
  const nakedPaths = ["/testies", "/auth", "/checkout", "/sitemap.xml"];
  $: naked = nakedPaths.includes($page?.url?.pathname);
  $: user = data?.user;
  $: cart = data?.cart;
  $: count = cart?.items?.length || null;

  import { onMount } from "svelte";

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    themeChange(false);
    // 👆 false parameter is required for svelte
  });

  export async function load() {
    // global variable
    let login = false;

    // Return it as part of every page's data
    return { props: { login } };
  }
  // let h;
</script>

<ToastContainer />
<Toaster />
{#if naked}
  <slot />
{:else}
  <div class="mt-[20vh]">
    <NavBar bind:user bind:cart bind:count />
    <slot />
    <Footer />
  </div>
{/if}
