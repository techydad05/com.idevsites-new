<script lang="ts">
   import NavLinks from './NavLinks.svelte'
   // import Icons from './Icons.svelte'
   import Cart from './Cart.svelte'
   import Account from './Account.svelte'
   import SearchBox from './SearchBox.svelte'
   import SideBar from './SideBar.svelte'
   export let user: {}
   export let cart: {}
   export let count: number

   let showThemeChange = false;
</script>

<div class="navbar bg-secondary fixed top-0 z-30 h-[20vh]">
  <div class="navbar-start">
    
  </div>
  <div class="navbar-center w-1/4 h-full justify-center">
    <!-- <a class="btn btn-ghost text-xl">daisyUI</a> -->
    <img class="h-full max-w-none" src="/logo.png" alt="">
  </div>
  <div class="navbar-end">
    <!-- <button class="btn btn-ghost btn-circle">

    </button>
    <button class="btn btn-ghost btn-circle">
      
    </button> -->
    <SideBar {user} />
  </div>
</div>