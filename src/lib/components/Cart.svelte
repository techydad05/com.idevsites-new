<script lang="ts">
  import { X, ShoppingCart, Check } from "lucide-svelte";
  import { createDialog } from "@melt-ui/svelte";
  import { fade, fly } from "svelte/transition";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { formatPrice } from "$lib/utils";
  import { addToast } from "$src/lib/components/DaisyUI/DaisyToast/toastStore";

  export let cart: any;
  export let count: number;
  let removeItemForm: any = null;
  $: cart = cart;
  $: items = cart?.items || [];
  $: total = cart?.subtotal;
  let confirming = false;
  const {
    elements: { trigger, portalled, overlay, content, title, close },
    states: { open },
  } = createDialog({ preventScroll: true });
</script>

{#if $open}
  <button {...$close} use:close class="btn btn-ghost relative">
    <span class="sr-only">Close cart</span>
    <ShoppingCart class="text-primary h-10 w-10" />
    {#if count > 0}
      <span class="badge badge-primary absolute top-3 right-2">{count}</span>
    {/if}
  </button>
{:else}
  <button {...$trigger} use:trigger class="btn btn-ghost relative">
    <span class="sr-only">View cart</span>
    <ShoppingCart class="text-primary h-10 w-10" />
    {#if count > 0}
      <span class="badge badge-primary absolute top-3 right-2">{count}</span>
    {/if}
  </button>
{/if}

<div use:portalled>
  {#if $open}
    <div {...$overlay} use:overlay class="fixed inset-0 z-20 bg-black/50" transition:fade={{ duration: 150 }}></div>
    <div {...$content} use:content id="cart" class="overflow-auto fixed right-0 top-[20vh] z-40 w-full h-[80vh] pb-0 mb-0 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/2 bg-base-100 p-6 shadow-2xl rounded-lg focus:outline-none" transition:fly={{ x: "100%", duration: 300, opacity: 1 }}>
      <div class="px-4 sm:px-8">
        <h2 {...$title} use:title class="mb-6 text-center text-4xl font-bold tracking-tight text-primary">
          Your Cart
        </h2>
        <ul role="list" class="space-y-4">
          {#each items as item, i}
            <li class="card card-bordered shadow-md flex p-4">
              <a data-sveltekit-reload href={`/product/${item.variant.product.handle}?variant=${item.variant_id}`} class="flex-shrink-0">
                <img src={item.thumbnail} alt={item.description} class="h-24 w-24 rounded-md object-cover" />
              </a>
              <div class="ml-4 flex flex-1 flex-col justify-between">
                <div class="flex justify-between">
                  <a data-sveltekit-reload href={`/product/${item.variant.product.handle}?variant=${item.variant_id}`} class="text-lg font-medium text-primary hover:text-primary-focus">
                    {item.title}
                  </a>
                  <div>
                    <p class="text-lg font-medium text-secondary">
                      {formatPrice(item.unit_price)}
                    </p>
                    <p class="text-sm text-secondary">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between">
                  <form action="/cart?/update" method="post" use:enhance={() => {
                    return async ({ result }) => {
                      if (result.type === "success") invalidateAll();
                    };
                  }}>
                    <select name="quantity" class="select select-secondary select-sm w-full h-12 max-w-xs" on:change={async (e) => {
                      const form = e.target.closest("form");
                      const formData = new FormData(form);
                      const result = await fetch(form.action, {
                        method: "POST",
                        body: formData,
                      }).then((res) => res.json());
                      if (result.type === "success") invalidateAll();
                    }}>
                      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as qty}
                        <option value={qty} selected={qty === item.quantity}>{qty}</option>
                      {/each}
                    </select>
                    <input type="hidden" name="itemId" value={item.id} />
                  </form>
                  <form action="/cart?/remove" method="post" use:enhance bind:this={removeItemForm} use:enhance={() => {
                    return async ({ result }) => {
                      if (result.type === "success")
                        invalidateAll().then(() => {
                          addToast({
                            title: "Success",
                            type: "success",
                            content: "<p>Item removed successfully.</p>",
                            timer: 3000,
                            isClose: true,
                          });
                        });
                    };
                  }}>
                    <div class="ml-4">
                      {#if confirming === item.id}
                        <div class="flex space-x-2">
                          <button type="button" class="btn btn-sm btn-success" on:click={() => removeItemForm.submit()}>
                            <Check class="h-5 w-5" />
                          </button>
                          <button type="button" class="btn btn-sm btn-error" on:click={() => confirming = false}>
                            <X class="h-5 w-5" />
                          </button>
                        </div>
                      {:else}
                        <button type="button" on:click={() => confirming = item.id} class="btn btn-sm btn-outline btn-error">
                          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      {/if}
                    </div>
                    <input type="hidden" name="itemId" value={item.id} />
                  </form>
                </div>
              </div>
            </li>
          {/each}
          {#if items.length === 0}
            <li class="text-center text-lg">Your cart is empty.</li>
          {/if}
        </ul>
        <section aria-labelledby="summary-heading" class="border-t border-gray-200 bg-base-200 rounded-lg p-6 mt-6 shadow-inner mb-5">
          {#if items.length > 0}
            <h2 id="summary-heading" class="sr-only">Order summary</h2>
            <div>
              <dl class="space-y-4">
                <div class="flex items-center justify-between">
                  <dt class="text-lg font-medium">Subtotal</dt>
                  <dd class="text-lg font-medium">{formatPrice(total)}</dd>
                </div>
              </dl>
              <p class="mt-1 text-md">Shipping and taxes will be calculated at checkout.</p>
            </div>
            <form action="/checkout">
              <button use:close type="submit" class="btn btn-primary w-full mt-4">Proceed to Checkout</button>
            </form>
          {/if}
          <button {...$close} use:close class="btn btn-link text-center w-full mt-4 text-secondary">
            &larr; Continue Shopping
          </button>
        </section>
      </div>
    </div>
  {/if}
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
