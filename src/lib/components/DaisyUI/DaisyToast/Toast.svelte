<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let id;
  export let title = "";
  export let type = "info"; // info, success, warning, error
  export let content = "";
  export let timer = 5000; // Default timer of 5 seconds
  export let isClose = true; // Whether the toast can be closed manually

  const dispatch = createEventDispatcher();

  let timeout;

  onMount(() => {
    if (timer) {
      timeout = setTimeout(() => {
        closeToast();
      }, timer);
    }
  });

  function closeToast() {
    dispatch("close", { id });
    clearTimeout(timeout);
  }

  $: toastClasses = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  }[type];
</script>

<style>
  .toast-content {
    display: flex;
    flex-direction: column;
  }
</style>

<div class={`alert ${toastClasses} shadow-lg mb-4 relative`}>
  <div class="flex flex-col min-w-36">
    {#if title}
      <strong class="font-bold">{title}</strong>
    {/if}
    <div class="toast-content" contenteditable bind:innerHTML={content}></div>
  </div>
  {#if isClose}
    <button class="btn btn-sm btn-outline absolute top-0 right-0 rounded-xl m-1" on:click={closeToast}>
      ✕
    </button>
  {/if}
</div>
