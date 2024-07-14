<!-- TextInput.svelte -->
<script>
  export let text;
  export let animation;
  export let duration;
  export let opacity;
  export let easing;
  export let color;
  export let size;

  const animations = [
    "fadeIn",
    "slideIn",
    "scaleIn",
    "rotateIn",
    "bounceIn",
    "flipIn",
    "swingIn",
    "rollIn",
    "zoomIn",
    "shakeIn",
  ];

  const easingFunctions = [
    "linear",
    "cubicIn",
    "cubicOut",
    "cubicInOut",
    "quadIn",
    "quadOut",
    "quadInOut",
    "quartIn",
    "quartOut",
    "quartInOut",
    "quintIn",
    "quintOut",
    "quintInOut",
    "sineIn",
    "sineOut",
    "sineInOut",
    "expoIn",
    "expoOut",
    "expoInOut",
    "circIn",
    "circOut",
    "circInOut",
    "backIn",
    "backOut",
    "backInOut",
    "elasticIn",
    "elasticOut",
    "elasticInOut",
    "bounceIn",
    "bounceOut",
    "bounceInOut",
  ];
</script>

<div class="w-full">
  <div class="form-control w-1/5">
    <label class="label" for="text-input">Text</label>
    <input
      id="text-input"
      type="text"
      bind:value={$text}
      placeholder="Enter your text here"
      class="input input-bordered w-full"
    />
  </div>

  <div class="form-control w-1/5">
    <label class="label" for="animation-select">Animation</label>
    <select
      id="animation-select"
      bind:value={$animation}
      class="select select-bordered w-full"
    >
      {#each animations as anim}
        <option value={anim}>{anim}</option>
      {/each}
    </select>
  </div>

  <div class="form-control w-1/5">
    <label class="label" for="easing-select">Easing</label>
    <select
      id="easing-select"
      bind:value={$easing}
      class="select select-bordered w-full"
    >
      {#each easingFunctions as ease}
        <option value={ease}>{ease}</option>
      {/each}
    </select>
  </div>

  <div class="form-control w-1/5">
    <label class="label" for="duration-range">Duration: {$duration}ms</label>
    <input
      id="duration-range"
      type="range"
      bind:value={$duration}
      min="100"
      max="5000"
      step="100"
      class="range"
    />
  </div>

  <div class="form-control w-1/5">
    <label class="label" for="opacity-range"
      >Opacity: {$opacity.toFixed(1)}</label
    >
    <input
      id="opacity-range"
      type="range"
      bind:value={$opacity}
      min="0"
      max="1"
      step="0.1"
      class="range"
    />
  </div>

  <div class="form-control w-1/5">
    <label class="label" for="color-input">Color</label>
    <input
      id="color-input"
      type="color"
      bind:value={$color}
      class="w-full h-10"
    />
  </div>

  <div class="form-control w-1/5">
    <label class="label" for="size-range">Size: {$size}px</label>
    <input
      id="size-range"
      type="range"
      bind:value={$size}
      min="12"
      max="72"
      step="1"
      class="range"
    />
  </div>
</div>

<style>
    .form-control {
        float: left;
        display: inline-flex;
    }
</style>