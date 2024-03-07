<script lang="ts">
   import NavLinks from './NavLinks.svelte'
   // import Icons from './Icons.svelte'
   import Cart from './Cart.svelte'
   import Account from './Account.svelte'
   import SearchBox from './SearchBox.svelte'
   import SideBar from './SideBar.svelte'
    import AnimatedIcon from './AnimatedIcon.svelte';
   export let user: {}
   export let cart: {}
   export let count: number

   let showThemeChange = false;
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    
  </div>
  <div class="navbar-center w-1/4">
    <!-- <a class="btn btn-ghost text-xl">daisyUI</a> -->
    <img src="/logo.png" width="100%" alt="">
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost btn-circle">

    </button>
    <button class="btn btn-ghost btn-circle">
      
    </button>
    <AnimatedIcon />
  </div>
</div>