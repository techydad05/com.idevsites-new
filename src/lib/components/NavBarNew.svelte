<script lang="ts">
  import NavLinks from "./NavLinks.svelte";
  // import Icons from './Icons.svelte'
  import Cart from "./Cart.svelte";
  import Account from "./Account.svelte";
  import SearchBox from "./SearchBox.svelte";
  import SideBar from "./SideBar.svelte";
  export let user: {};
  export let cart: {};
  export let count: number;

  let showThemeChange = false;
</script>

<div class="navbar bg-secondary fixed top-0 z-30 h-[20vh] shadow-lg">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:dblclick={() => (showThemeChange = !showThemeChange)}
    class="absolute top-0 left-0 h-4 w-4"
  />
  <div class:hidden={!showThemeChange} class="dropdown absolute">
    <select
      data-choose-theme
      class="select select-bordered text-primary w-full"
    >
      <option value="">Pick Theme</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="cupcake">Cupcake</option>
      <option value="bumblebee">Bumblebee</option>
      <option value="emerald">Emerald</option>
      <option value="corporate">Corporate</option>
      <option value="synthwave">Synthwave</option>
      <option value="retro">Retro</option>
      <option value="cyberpunk">Cyberpunk</option>
      <option value="valentine">Valentine</option>
      <option value="halloween">Halloween</option>
      <option value="garden">Garden</option>
      <option value="forest">Forest</option>
      <option value="aqua">Aqua</option>
      <option value="lofi">Lofi</option>
      <option value="pastel">Pastel</option>
      <option value="fantasy">Fantasy</option>
      <option value="wireframe">Wireframe</option>
      <option value="black">Black</option>
      <option value="luxury">Luxury</option>
      <option value="dracula">Dracula</option>
      <option value="cmyk">Cmyk</option>
      <option value="autumn">Autumn</option>
      <option value="business">Business</option>
      <option value="acid">Acid</option>
      <option value="lemonade">Lemonade</option>
      <option value="night">Night</option>
      <option value="coffee">Coffee</option>
      <option value="winter">Winter</option>
      <option value="dim">Dim</option>
      <option value="nord">Nord</option>
      <option value="sunset">Sunset</option>
    </select>
  </div>
  <div class="navbar-start"></div>
  <div class="navbar-center w-1/4 h-full justify-center">
    <!-- <a class="btn btn-ghost text-xl">daisyUI</a> -->
    <img class="h-full max-w-none" src="/logo.png" alt="" />
  </div>
  <div class="navbar-end">
    <!-- <button class="btn btn-ghost btn-circle">

    </button>
    <button class="btn btn-ghost btn-circle">
      
    </button> -->
    <SideBar {user} />
  </div>
</div>
