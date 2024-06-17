<script>
    import { toasts, removeToast } from './toastStore';
    import { fade, blur, slide } from 'svelte/transition';
    import Toast from './Toast.svelte';
    import { onDestroy } from 'svelte';
  
    // let $toasts;
    // const unsubscribe = toasts.subscribe(value => $toasts = value);
  
    // onDestroy(() => {
    //   unsubscribe();
    // });
  </script>
  
  <div class="fixed bottom-0 right-0 p-4 space-y-4 z-[9999]">
    {#each $toasts as toast (toast.id)}
      <div transition:slide>
        <Toast {...toast} on:close={(e) => removeToast(e.detail.id)} />
      </div>
    {/each}
  </div>
  