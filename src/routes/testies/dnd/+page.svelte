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
          // Do nothing on drop end
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
    
    interact('.container').dropzone({
      accept: '.draggable',
      overlap: 0.75,
      ondropactivate(event) {
        event.target.classList.add('drop-active');
      },
      ondragenter(event) {
        event.target.classList.add('drop-target');
        event.relatedTarget.classList.add('can-drop');
      },
      ondragleave(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
      },
      ondrop(event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        // Set the position of the draggable element relative to the container
        const dropRect = dropzoneElement.getBoundingClientRect();
        const dragRect = draggableElement.getBoundingClientRect();
        const x = dragRect.left - dropRect.left;
        const y = dragRect.top - dropRect.top;

        draggableElement.style.position = 'absolute';
        draggableElement.style.left = `${x}px`;
        draggableElement.style.top = `${y}px`;
        draggableElement.setAttribute('data-x', x);
        draggableElement.setAttribute('data-y', y);
      },
      ondropdeactivate(event) {
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
      }
    });
  });

  function toggleSidebar() {
    minimized = !minimized;
  }
</script>


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
</div>
