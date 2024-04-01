<script lang="ts">
   import SocialLinks from '$lib/components/SocialLinks.svelte'
   let year = new Date().getFullYear()
</script>
<footer class="bg-base-100 text-neutral-100">
   <div class="mx-auto max-w-7xl overflow-hidden py-10 px-6">
      <nav class="sm:flex flex-wrap justify-center gap-x-12" aria-label="Footer">
         <div class="flex justify-center">
            <a href="/about" class="">About</a>
         </div>   
         <div class="flex justify-center">
            <a href="/location" class="pb-2">Location</a>
         </div>   
         <div class="flex justify-center">
            <a href="/blog" class="pb-2">Blog</a>
         </div>   
         <div class="flex justify-center">
            <a href="/account" class="pb-2">Account</a>
         </div>   
         <div class="flex justify-center">
            <a href="/privacy" class="pb-2">Privacy</a>
         </div>   
         <div class="flex justify-center">
            <a href="/terms" class="pb-2">Terms</a>
         </div>
      </nav>
      <div class="mt-8 flex justify-center space-x-10">
         <SocialLinks />
      </div>
      <p class="mt-8 text-center text-sm leading-5 text-neutral-100">&copy; {year} Your Medusa Store</p>
   </div>
</footer>