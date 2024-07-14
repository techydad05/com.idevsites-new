<script>
    import { elements } from './stores';
  
    export let addElement;
  </script>
  
  <div class="w-16 h-full overflow-y-auto bg-gray-100 border-r">
    {#each $elements as element}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="cursor-pointer p-2"
        on:click={() => addElement(element)}
      >
        <img src={element.icon} alt={element.name} class="w-full h-auto"/>
      </div>
    {/each}
  </div>
  