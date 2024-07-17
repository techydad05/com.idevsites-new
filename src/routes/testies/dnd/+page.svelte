<script>
  import { onMount } from 'svelte';
  import interact from 'interactjs';
  let minimized = false;
  let images = [
    { id: 1, src: "https://picsum.photos/50" },
    { id: 2, src: "https://picsum.photos/51" },
    { id: 3, src: "https://picsum.photos/52" }
  ];

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
        const originalElement = event.relatedTarget;
        const dropzoneElement = event.target;

        // Create a copy of the image
        const draggableElement = originalElement.cloneNode(true);
        draggableElement.style.position = 'absolute';
        draggableElement.style.left = `${event.dragEvent.clientX - dropzoneElement.getBoundingClientRect().left}px`;
        draggableElement.style.top = `${event.dragEvent.clientY - dropzoneElement.getBoundingClientRect().top}px`;
        draggableElement.setAttribute('data-x', event.dragEvent.clientX - dropzoneElement.getBoundingClientRect().left);
        draggableElement.setAttribute('data-y', event.dragEvent.clientY - dropzoneElement.getBoundingClientRect().top);

        // Append the copy to the container
        dropzoneElement.appendChild(draggableElement);
        // Set the position of the draggable element relative to the container
        const x = event.dragEvent.clientX - dropzoneElement.getBoundingClientRect().left;
        const y = event.dragEvent.clientY - dropzoneElement.getBoundingClientRect().top;

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
    {#each images as image (image.id)}
      <img src={image.src} class="draggable mt-4" />
    {/each}
  </div>
</div>
