<script lang="ts">
  import { formatPrice } from "../utils";

   export let product: any;
 </script>
 
 <a href="/product/{product.handle}" class="group block p-4 border rounded-lg bg-[#f7f7fa] transition">
  <div class="rounded-lg overflow-hidden">
    <img alt={product.title} src={product.thumbnail} class="mx-auto h-80 w-auto object-center transition-transform duration-300 ease-in-out group-hover:scale-150" />
  </div>
  <div class="text-black flex justify-between items-center mt-4">
    <h3 class="text-lg font-bold text-gray-700">{product.title}</h3>
    <p class="text-lg font-medium text-gray-900">{formatPrice(product.variants[0].prices[1].amount)}</p>
  </div>
</a>

 