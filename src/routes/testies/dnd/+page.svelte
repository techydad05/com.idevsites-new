<script>
    import Sidebar from './Sidebar.svelte';
    import PageBuilder from './PageBuilder.svelte';
    import Clipboard from './Clipboard.svelte';
    import { pageElements } from './stores';
  
    function addElement(element) {
      pageElements.update(elements => [...elements, element]);
    }
  </script>
  
  <div class="flex h-screen">
    <Sidebar {addElement}/>
    <div class="flex-grow">
      <PageBuilder/>
      <Clipboard/>
    </div>
  </div>
  