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

<div class="navbar bg-base-100 fixed top-0 z-[50] h-[20vh] shadow-lg">
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
  <div class="navbar-start">
    <a href="/" class="logo btn btn-ghost text-xl normal-case m-2">
      <img src="/svelte_logo.png" alt="" class="h-[inherit]" />
   </a>
  </div>
  <div class="navbar-center h-full justify-center">
    <!-- customization for the lure site...  -->
    <!-- <a class="h-full" href="/"><img class="h-full" src="/logo.png" alt="" /></a> -->
  </div>
  <div class="navbar-end">
    <div class="hidden lg:flex flex-row gap-4">
      <SearchBox />
      <Account {user} />
    </div>
    <Cart bind:cart bind:count />
    <div class="lg:hidden">
      <SideBar {user} />
    </div>
  </div>
  <!-- maybe change to this one? -->
  <!-- <div
     class="navbar bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg"
   >
     <div class="flex-1">
       <a class="btn btn-ghost normal-case text-xl text-white">MyWebsite</a>
     </div>
     <div class="flex-none">
       <button class="btn btn-ghost text-white">Home</button>
       <button class="btn btn-ghost text-white">Features</button>
       <button class="btn btn-ghost text-white">About</button>
       <button class="btn btn-ghost text-white">Contact</button>
     </div>
   </div> -->
</div> 

