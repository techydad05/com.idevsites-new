<script lang="ts">
    import { DndContext, type DndContextDescriptor } from '@dnd-kit/core';
    import { onMount, onDestroy } from 'svelte';
  
    export let id: string;
  
    let isOver = false;
    let node: HTMLElement;
  
    function droppable(node: HTMLElement, id: string) {
      let unsubscribe: () => void;
  
      onMount(() => {
        const context = DndContext.getContext() as DndContextDescriptor;
        if (!context) {
          console.warn('No DndContext found. Make sure you have wrapped your app with DndContext.');
          return;
        }
  
        const { activators, over } = context;
  
        unsubscribe = over.subscribe(overId => {
          isOver = overId === id;
        });
  
        activators.addActivator(node, {
          id,
          node,
          type: 'droppable',
        });
      });
  
      onDestroy(() => {
        if (unsubscribe) {
          unsubscribe();
        }
        
        const context = DndContext.getContext() as DndContextDescriptor;
        if (context) {
          context.activators.removeActivator(id);
        }
      });
  
      return {
        update(newId: string) {
          id = newId;
        },
      };
    }
  
    $: style = `opacity: ${isOver ? 1 : 0.5};`;
  </script>
  
  <div use:droppable={id} bind:this={node} {style}>
    <slot />
  </div><script>
  import { useDroppable } from '@dnd-kit/core';

  export let id;

  const { isOver, setNodeRef } = useDroppable({ id });
  const style = isOver
    ? 'padding: 1rem; background-color: lightgreen; border: 1px solid #ccc;'
    : 'padding: 1rem; background-color: lightgray; border: 1px solid #ccc;';
</script>

<div bind:this={setNodeRef} style={style}>
  <slot></slot>
</div>
