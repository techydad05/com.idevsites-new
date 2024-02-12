<script lang="ts">
   import '$src/app.postcss'
   import type { PageData } from './$types'
   import { page } from '$app/stores'
   import NavBar from '$lib/components/NavBar.svelte'
   import Footer from '$lib/components/Footer.svelte'
   export let data: PageData
   const nakedPaths = ['/auth', '/checkout', '/sitemap.xml']
   $: naked = nakedPaths.includes($page?.url?.pathname)
   $: user = data?.user
   $: cart = data?.cart
   $: count = cart?.items?.length || null
</script>
{#if naked}
   <slot />
{:else}
   <h1>testies 1 2 3 :D</h1>
   <NavBar bind:user={user} bind:cart={cart} bind:count={count} />
   <slot />
   <Footer />
{/if}