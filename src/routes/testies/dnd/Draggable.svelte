<script>
    import { useDraggable } from '@dnd-kit/core';
  
    export let id;
  
    const { attributes, listeners, setNodeRef } = useDraggable({
      id
    });
  </script>
  
  <div
    use:setNodeRef
    {...attributes}
    {...listeners}
  >
    <slot></slot>
  </div>
  
  <style>
    div {
      cursor: grab;
    }
  </style>
  <script>
  import { useDraggable } from '@dnd-kit/core';

  export let id;

  const { attributes, listeners, setNodeRef } = useDraggable({ id });
</script>

<div
  {attributes}
  {listeners}
  bind:this={setNodeRef}
  style="padding: 1rem; background-color: lightblue; border: 1px solid #ccc; cursor: grab;"
>
  <slot></slot>
</div>
