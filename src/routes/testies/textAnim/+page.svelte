<!-- <script>
    import ImageGallery from "./ImageGallery.svelte";
    import MorphingSvg from "./MorphingSVG.svelte";
  </script>
  <div>
    going to work on getting openai installed in the site for some testing of creating web elements
    <ImageGallery />
  </div> -->
<!-- <script>
  import OpenAiComponent from "$src/lib/components/openai/OpenAIComponent.svelte";
  export let data;
</script>

<OpenAiComponent user={data.user} />

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">GPT 4o</h1>
  <div id="responseTarget" class="w-full h-[80vh] flex flex-col"></div>
</div> -->


<!-- AnimatedTextPage.svelte -->
<script>
  import TextInput from "../lib/TextInput.svelte";
  import AnimatedText from "../lib/AnimatedText.svelte";
  import CodeWindow from "../lib/CodeWindow.svelte";
  import { writable } from "svelte/store";

  const text = writable("Animated Text");
  const animation = writable("fadeIn");
  const duration = writable(1000);
  const opacity = writable(1);
  const easing = writable("linear");
  const color = writable("#000000");
  const size = writable(32);

  let playAnimation = () => {};
</script>

<main class="mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Animated Text Generator</h1>
  <div>
    <div class="grid grid-flow-col grid-2">
      <AnimatedText
        {text}
        {animation}
        {duration}
        {opacity}
        {easing}
        {color}
        {size}
        bind:playAnimation
      />
      <div class="h-1/3">
        <CodeWindow
          {text}
          {animation}
          {duration}
          {opacity}
          {easing}
          {color}
          {size}
        />
      </div>
    </div>
    <div class="flex flex-col w-full">
      <TextInput
        {text}
        {animation}
        {duration}
        {opacity}
        {easing}
        {color}
        {size}
      />
      <button class="btn btn-primary mt-4" on:click={() => playAnimation()}
        >Replay Animation</button
      >
    </div>
  </div>
</main>
