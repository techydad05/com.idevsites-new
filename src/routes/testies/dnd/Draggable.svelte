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
  