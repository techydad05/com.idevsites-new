<!-- <script>
    import ImageGallery from "./ImageGallery.svelte";
    import MorphingSvg from "./MorphingSVG.svelte";
  </script>
  <div>
    going to work on getting openai installed in the site for some testing of creating web elements
    <ImageGallery />
  </div> -->
<script>
  // @ts-nocheck
  import OpenAiComponent from "$src/lib/components/OpenAIComponent.svelte";
</script>

<OpenAiComponent />

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">GPT 4o</h1>
  <div id="responseTarget"></div>
</div>
