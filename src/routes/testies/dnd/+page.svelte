<script>
  import { DndContext } from '@dnd-kit/core';
  import Draggable from './Draggable.svelte';
  import Droppable from './Droppable.svelte';

  let parent = null;

  function handleDragEnd(event) {
    const { over } = event;
    parent = over ? over.id : null;
  }
</script>

<DndContext on:dragend={handleDragEnd}>
  {#if !parent}
    <Draggable id="draggable">Go ahead, drag me.</Draggable>
  {/if}
  <Droppable id="droppable">
    {#if parent === "droppable"}
      <Draggable id="draggable">Go ahead, drag me.</Draggable>
    {:else}
      Drop here
    {/if}
  </Droppable>
</DndContext>

<style>
  /* Add any necessary styles here */
</style>
