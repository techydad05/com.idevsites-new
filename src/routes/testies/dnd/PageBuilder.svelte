<script>
    import { dndzone } from 'svelte-dnd-action';
    import { pageElements } from './stores';
    import { get } from 'svelte/store';
  
    let items = get(pageElements);
  
    function handleDrop(event) {
      items = event.detail.items;
      pageElements.set(items);
    }
  </script>
  
  <style>
    .dnd-item {
      margin-bottom: 8px;
      padding: 8px;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
      cursor: move;
    }
  </style>
  
  <div
    use:dndzone={{ items, flipDurationMs: 300 }}
    on:consider={handleDrop}
    on:finalize={handleDrop}
    class="w-full h-full p-4 bg-white"
  >
    {#each items as item, index}
      <div class="dnd-item">
        {#if item.type === 'button'}
          <button class="btn">{item.content}</button>
        {/if}
        <!-- Add more DaisyUI components here -->
      </div>
    {/each}
  </div>
  