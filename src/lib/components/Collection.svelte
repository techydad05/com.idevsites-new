<script lang="ts">
   import ProductCard from './ProductCard.svelte';
   export let products: any;
 </script>
 
 <div class="bg-base-100">
   <div class="container mx-auto py-8 px-4">
     <h2 id="products-heading" class="sr-only">Products</h2>
     <div class="masonry-grid">
       {#each products as product}
       <div>
          <ProductCard {product} />
       </div>
       {/each}
     </div>
   </div>
 </div>
 
 <style>
   .masonry-grid {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
     gap: 16px;
   }
   .masonry-item {
     break-inside: avoid;
   }
 </style>
 