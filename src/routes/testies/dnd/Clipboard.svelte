<script>
    import { pageElements } from './stores';
  
    function copyToClipboard() {
      const code = $pageElements.map(e => `<${e.type}>${e.content}</${e.type}>`).join('\n');
      navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    }
  </script>
  
  <button on:click={copyToClipboard} class="btn btn-sm">
    Copy
  </button>
  