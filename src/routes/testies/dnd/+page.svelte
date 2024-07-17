<script>
  import { onMount } from 'svelte';
  import interact from 'interactjs';
  let minimized = false;

  onMount(() => {
    interact('.draggable').draggable({
      inertia: true,
      autoScroll: true,
      listeners: {
        move: dragMoveListener,
        end(event) {
          // Move back to the sidebar on drop
          event.target.style.transform = 'none';
          event.target.setAttribute('data-x', 0);
          event.target.setAttribute('data-y', 0);
        }
      }
    });

    function dragMoveListener(event) {
      var target = event.target;
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  });

  function toggleSidebar() {
    minimized = !minimized;
  }
</script>

<style>
  .draggable {
    position: absolute;
    z-index: 10;
    cursor: grab;
  }
  .sidebar {
    width: 75px;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transition: transform 0.3s ease;
  }
</style>

<div class="h-screen w-screen flex relative">
  <div class={`sidebar ${minimized ? '-translate-x-full' : ''}`}>
    <button class="btn btn-sm btn-circle absolute top-2 -right-8" on:click={toggleSidebar}>
      {#if minimized}
        ▶
      {:else}
        ✖
      {/if}
    </button>
    <img src="https://picsum.photos/50" class="draggable mt-12" />
    <img src="https://picsum.photos/51" class="draggable mt-4" />
    <img src="https://picsum.photos/52" class="draggable mt-4" />
  </div>
  <div class="flex-grow bg-gray-100 p-4">
    <div class="container h-full border-dashed border-2 border-gray-300"></div>
  </div>
</div>
