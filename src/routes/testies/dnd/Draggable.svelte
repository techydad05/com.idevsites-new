<script>
  import { useDraggable } from '@dnd-kit/core';

  export let id;

  const { attributes, listeners, setNodeRef } = useDraggable({ id });
</script>

<div
  {...attributes}
  {...listeners}
  bind:this={setNodeRef}
  style="padding: 16px; background-color: lightblue; border: 1px solid blue; cursor: grab;"
>
  <slot />
</div>
