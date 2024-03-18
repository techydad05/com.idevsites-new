<script lang="ts">
   import type { PageData } from "./$types";
   import Collection from "$lib/components/Collection.svelte";
   import Carousel from "$src/lib/components/Carousel.svelte";
    import DaisyHero from "$src/lib/components/DaisyHero.svelte";
    import ItemCarousel from "$src/lib/components/ItemCarousel.svelte";
   export let data: PageData;
</script>

<Carousel />
<DaisyHero />
<ItemCarousel items={data.products} />
<!-- <Collection products={data.products} /> -->

<!-- {#each data.products as product}
   <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
   </div>
{:else}
   No products found.
{/each} -->
