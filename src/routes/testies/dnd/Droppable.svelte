<script>
  import { useDroppable } from '@dnd-kit/core';

  export let id;

  const { isOver, setNodeRef } = useDroppable({ id });
  const style = isOver
    ? 'padding: 16px; background-color: lightgreen; border: 1px solid green;'
    : 'padding: 16px; background-color: lightgray; border: 1px solid gray;';
</script>

<div bind:this={setNodeRef} style={style}>
  <slot />
</div>
