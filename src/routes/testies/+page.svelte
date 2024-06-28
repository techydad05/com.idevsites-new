<!-- <script>
    import ImageGallery from "./ImageGallery.svelte";
    import MorphingSvg from "./MorphingSVG.svelte";
  </script>
  <div>
    going to work on getting openai installed in the site for some testing of creating web elements
    <ImageGallery />
  </div> -->
<script>
  import OpenAiComponent from "$src/lib/components/openai/OpenAIComponent.svelte";
  export let data;
</script>

<OpenAiComponent user={data.user} />

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">GPT 4o</h1>
  <div id="responseTarget" class="w-full h-[80vh] flex items-center justify-center"></div>
</div>
