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

//    let theme_array = [
//     'light',
//     'dark',
//     'cupcake',
//     'bumblebee',
//     'emerald',
//     'corporate',
//     'synthwave',
//     'retro',
//     'cyberpunk',
//     'valentine',
//     'halloween',
//     'garden',
//     'forest',
//     'aqua',
//     'lofi',
//     'pastel',
//     'fantasy',
//     'wireframe',
//     'black',
//     'luxury',
//     'dracula',
//     'cmyk',
//     'autumn',
//     'business',
//     'acid',
//     'lemonade',
//     'night',
//     'coffee',
//     'winter'
//   ];
//   export let new_theme: String;

   let showThemeChange = false;
</script>
<nav class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 bg-transparent">
   <div class="flex flex-grow items-center justify-between">
      <div
         on:dblclick={() => (showThemeChange = !showThemeChange)}
         class="absolute top-0 left-0 h-4 w-4"
       />
      <div class="flex flex-none items-center">
         <a href="/" class="logo btn btn-ghost text-xl normal-case m-2">
            <img src="/svelte_logo.png" alt="" class="h-[inherit]" />
         </a>
         <div class:hidden={!showThemeChange} class="dropdown absolute">
            <select data-choose-theme class="select select-bordered text-primary w-full">
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
         <div class="hidden lg:block mr-auto lg:ml-6 text-primary-content">
            <!-- <NavLinks /> -->
         </div>
      </div>
      <div class="flex flex-grow align-middle items-center justify-between ml-4">
         <SearchBox />
      </div>
      <div class="flex flex-none relative items-center justify-end md:ml-2 lg:ml-4">
         <div>
            <Cart bind:cart={cart} bind:count={count} />
         </div>
         <div class="hidden md:block">
            <Account {user} />
         </div>
         <div class="lg:hidden">
            <SideBar {user} />
         </div>
      </div>
   </div>
</nav>


<style>
   .rideCart {
     animation: ridingCart 1.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.35s forwards;
   }
 
   .unrotate {
     animation: undumpCart 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
   }
 
   .rotate {
     animation: dumpCart 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
   }
 
   @keyframes dumpCart {
     from {
       transform: rotate(0deg);
     }
     to {
       transform: rotate(180deg);
     }
   }
   @keyframes undumpCart {
     from {
       transform: rotate(180deg);
     }
     to {
       transform: rotate(0deg) translateY(0);
     }
   }
 
   @keyframes ridingCart {
     0% {
       transform: translateX(0) rotate(0deg);
       opacity: 0 !important;
     }
     50% {
       transform: translateX(270%) rotate(-25deg);
     }
     80% {
       transform: translateX(270%) scaleX(-1) rotate(-25deg);
     }
     100% {
       transform: translateX(135%) scaleX(-1) rotate(0deg);
     }
   }
 
   .cartdiv.open {
     height: 50%;
     transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   }
 
   .open-menu {
     visibility: visible !important;
     opacity: 1 !important;
   }
   a.logo {
     text-decoration: none;
   }
   .logo::after {
     content: 'VEDUSA';
     text-decoration: none;
     font-size: 2rem;
     font-weight: 300;
   }
   #nav-icon3 {
     width: 60px;
     height: 40px;
     position: relative;
     -webkit-transform: rotate(0deg);
     -moz-transform: rotate(0deg);
     -o-transform: rotate(0deg);
     transform: rotate(0deg);
     -webkit-transition: 0.5s ease-in-out;
     -moz-transition: 0.5s ease-in-out;
     -o-transition: 0.5s ease-in-out;
     transition: 0.5s ease-in-out;
     cursor: pointer;
   }
 
   #nav-icon3 span {
     display: block;
     position: absolute;
     height: 5px;
     width: 100%;
     opacity: 1;
     left: 0;
     -webkit-transform: rotate(0deg);
     -moz-transform: rotate(0deg);
     -o-transform: rotate(0deg);
     transform: rotate(0deg);
     -webkit-transition: 0.25s ease-in-out;
     -moz-transition: 0.25s ease-in-out;
     -o-transition: 0.25s ease-in-out;
     transition: 0.25s ease-in-out;
   }
   #nav-icon3 span:nth-child(1) {
     top: 0px;
   }
 
   #nav-icon3 span:nth-child(2),
   #nav-icon3 span:nth-child(3) {
     top: 15px;
   }
 
   #nav-icon3 span:nth-child(4) {
     top: 30px;
   }
 
   #nav-icon3.open span:nth-child(1) {
     top: 12px;
     width: 0%;
     left: 50%;
   }
 
   #nav-icon3.open span:nth-child(2) {
     -webkit-transform: rotate(45deg);
     -moz-transform: rotate(45deg);
     -o-transform: rotate(45deg);
     transform: rotate(45deg);
   }
 
   #nav-icon3.open span:nth-child(3) {
     -webkit-transform: rotate(-45deg);
     -moz-transform: rotate(-45deg);
     -o-transform: rotate(-45deg);
     transform: rotate(-45deg);
   }
 
   #nav-icon3.open span:nth-child(4) {
     top: 12px;
     width: 0%;
     left: 50%;
   }
 </style>

<!-- <script lang="ts">
   import NavLinks from './NavLinks.svelte'
   import Cart from './Cart.svelte'
   import Account from './Account.svelte'
   import SearchBox from './SearchBox.svelte'
   import SideBar from './SideBar.svelte'
   export let user: {}
   export let cart: {}
   export let count: number
</script>
<nav class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 bg-transparent">
   <div class="flex flex-grow items-center justify-between mt-3">
      <div class="flex flex-none items-center">
         <a class="inline-block text-3xl font-bold" href="/">
            <img src="/logo.svg" alt="Logo" class="h-14 w-auto">
         </a>
         <div class="hidden lg:block mr-auto lg:ml-6">
            <NavLinks />
         </div>
      </div>
      <div class="flex flex-grow align-middle items-center justify-between ml-4">
         <SearchBox />
      </div>
      <div class="flex flex-none relative align-middle justify-end lg:ml-4">
         <div>
            <Cart bind:cart={cart} bind:count={count} />
         </div>
         <div class="hidden md:block">
            <Account {user} />
         </div>
         <div class="lg:hidden">
            <SideBar {user} />
         </div>
      </div>
   </div>
</nav> -->