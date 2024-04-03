<script lang="ts">
   import type { PageData } from "./$types";
   import Collection from "$lib/components/Collection.svelte";
   import DaisyHero from "$src/lib/components/DaisyHero.svelte";
   import ItemCarousel from "$src/lib/components/ItemCarousel.svelte";
   import HomeCarousel from "$src/lib/components/HomeCarousel.svelte";
   import { onMount } from "svelte";
   export let data: PageData;

   let scrollPercent;

   onMount(async () => {
      document.onscroll = function () {
         scrollPercent = getVerticalScrollPercentage(document.body);
         console.log(`${Math.round(scrollPercent)}%`);
      };

      function getVerticalScrollPercentage(elm) {
         var p = elm.parentNode;
         return (
            ((elm.scrollTop || p.scrollTop) /
               (p.scrollHeight - p.clientHeight)) *
            100
         );
      }
   });

   // let scrolledY;
   // let bodyHeight;
   // console.log(bodyHeight);
   // $: console.log(scrolledY);
</script>

<!-- <svelte:window bind:scrollY={scrolledY} /> -->

<section>
   <HomeCarousel items={data.products} />
</section>
<div class="shark-section relative">
   <svg
      xmlns="http://www.w3.org/2000/svg"
      class="fill-primary bg-base-100 testies"
      viewBox="0 0 1185 248"
      ><circle cx="76" cy="121.1" r="20" class="a" /><circle
         cx="870"
         cy="201.1"
         r="11"
         class="a"
      /><circle cx="814.5" cy="165.6" r="24.5" class="a" /><path
         d="M0 0v17.7c22.7 14.8 53 31.9 90.7 51.5 150.8 78 322 116.6 424.8 69.3 102.9-47.4 138-69.3 210.8-69.3s118.3 48.6 219.5 38.3 76.3-59.3 188.7-59.3c18.9 0 35.5 2.6 50.5 6.8V0H0z"
         class="a"
      /></svg
   >
   <svg
      xmlns="http://www.w3.org/2000/svg"
      class="shark absolute top-6 fill-primary"
      style:margin-left={`${scrollPercent*3}%`}
      width="6rem"
      height="6rem"
      viewBox="0 0 24 24"
      ><path
         d="M15.56 9.09C14.66 7.18 12.54 6 11 6c.47 1.4.28 2.57-.05 3.43C8.45 10 6 11 6 11S3 7 1 7l2 6l-1 4c2 0 4-3 4-3s5 2 8 2v2c.65 0 1.91-.83 2.73-2.23c1.24-.21 2.27-.56 3.14-.96c-.15-.18-.34-.37-.59-.51c-.65-.39-1.46-.63-2.28-.8c.82-.16 1.67-.28 2.59-.15c.46.06.95.19 1.41.51c.1.06.17.14.24.19C22.4 13.26 23 12.44 23 12c0-.87-3.81-2.5-7.44-2.91M18 12c-.55 0-1-.45-1-1c0-.24.1-.45.23-.62c.61.12 1.2.29 1.74.46c.03.05.03.1.03.16c0 .55-.45 1-1 1"
      /></svg
   >
</div>
<section id="section-2">
   <DaisyHero />
</section>
<svg
   xmlns="http://www.w3.org/2000/svg"
   class="fill-base-100 bg-primary"
   viewBox="0 0 1185 248"
   ><path
      d="M50.5 199.8c112.4 0 87.5-49 188.7-59.3s146.7 38.3 219.5 38.3 107.9-21.9 210.8-69.3c102.8-47.3 274-8.7 424.8 69.3 37.7 19.5 68 36.7 90.7 51.5V0H0v193C15 197.2 31.6 199.8 50.5 199.8zM1109 106.9c11 0 20 9 20 20 0 11-9 20-20 20s-20-9-20-20C1089 115.9 1098 106.9 1109 106.9zM370.5 57.9c13.5 0 24.5 11 24.5 24.5 0 13.5-11 24.5-24.5 24.5S346 95.9 346 82.4C346 68.9 357 57.9 370.5 57.9zM315 35.9c6.1 0 11 4.9 11 11s-4.9 11-11 11 -11-4.9-11-11S308.9 35.9 315 35.9z"
   /></svg
>
<section>
   <ItemCarousel items={data.products} />
</section>
<svg
   xmlns="http://www.w3.org/2000/svg"
   class="fill-primary bg-base-100"
   viewBox="0 0 1185 248"
   ><circle cx="76" cy="121.1" r="20" class="a" /><circle
      cx="870"
      cy="201.1"
      r="11"
      class="a"
   /><circle cx="814.5" cy="165.6" r="24.5" class="a" /><path
      d="M0 0v17.7c22.7 14.8 53 31.9 90.7 51.5 150.8 78 322 116.6 424.8 69.3 102.9-47.4 138-69.3 210.8-69.3s118.3 48.6 219.5 38.3 76.3-59.3 188.7-59.3c18.9 0 35.5 2.6 50.5 6.8V0H0z"
      class="a"
   /></svg
>

<!-- <Collection products={data.products} /> -->
<!-- {#each data.products as product}
   <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
   </div>
{:else}
   No products found.
{/each} -->

<style>
   .shark {
      animation: swimming linear;
   }
   @keyframes swimming {
      from {
         margin-left: 0;
      }
      to {
         margin-left: 500px;
      }
   }

   /* .shark {
      -webkit-animation: shark-swim;
      webkit-animation: shark-swim;
      animation: shark-swim;
      -webkit-animation-timing-function: linear;
      webkit-animation-timing-function: linear;
      animation-timing-function: linear;
      -webkit-animation-timeline: view();
      webkit-animation-timeline: view();
      animation-timeline: view();
   }
   @keyframes shark-swim {
      from {
         transform: initial;
         -webkit-transform: initial;
         webkit-transform: initial;
      }
      to {
         transform: translate3d(80vw, -80px, 500px);
         -webkit-transform: translate3d(80vw, -80px, 500px);
         webkit-transform: translate3d(80vw, -80px, 500px);
      }
   } */
</style>
