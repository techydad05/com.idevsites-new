<!-- CodeWindow.svelte -->
<script>
  import { Clipboard } from "lucide-svelte";
  export let text;
  export let animation;
  export let duration;
  export let opacity;
  export let easing;
  export let color;
  export let size;

  $: code = `
  <script>
    import { ${$animation.toLowerCase()} } from 'svelte/transition';
    import { ${$easing} } from 'svelte/easing';
  
    let visible = true;
  <\/script>
  
  <div style="color: ${$color}; font-size: ${$size}px;">
    {#if visible}
      <p in:${$animation.toLowerCase()}={{
        duration: ${$duration},
        opacity: ${$opacity},
        easing: ${$easing}
      }}>
        ${$text}
      </p>
    {/if}
  </div>
    `.trim();

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
  }
</script>

<div class="mt-8 p-4">
  <h2 class="text-2xl font-bold mb-2">Generated Code</h2>
  <div class="bg-base-300 p-3 rounded-lg">
    <pre class="whitespace-pre-wrap relative text-sm"><code>{code}</code>
        <button class="absolute top-0 right-0" on:click={copyToClipboard}
        ><Clipboard /></button
      >
    </pre>
  </div>
</div>
