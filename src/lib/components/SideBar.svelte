<script lang="ts">
  import { X, Menu } from "lucide-svelte";
  import { createDialog } from "@melt-ui/svelte";
  import { fade, fly } from "svelte/transition";
  import NavLinks from "./NavLinks.svelte";
  import AnimatedIcon from "./AceternityComponents/AnimatedMenuIcon.svelte";
  export let user: {};
  const {
    elements: { trigger, portalled, overlay, content, close },
    states: { open },
  } = createDialog({ preventScroll: false });
</script>

<div class="flex items-center justify-center w-20 relative">
  {#if $open}
    <button class="w-full h-full absolute z-[100]" {...$close} use:close>
    </button>
  {:else if !$open}
    <button class="w-full h-full absolute z-[100]" {...$trigger} use:trigger>
    </button>
  {/if}
  <AnimatedIcon open={$open} />
</div>
<div use:portalled>
  {#if $open}
    <div
      {...$overlay}
      use:overlay
      class="fixed inset-0 z-[150] bg-black/50"
      transition:fade={{ duration: 150 }}
    />
    <div
      {...$content}
      use:content
      class="overflow-auto fixed left-0 top-[20vh] z-[151] h-screen w-full max-w-[300px] bg-white shadow-lg focus:outline-none"
      transition:fly={{ x: "-100%", duration: 300, opacity: 1 }}
    >
      <div
        class="flex flex-col justify-between h-full text-primary-content bg-secondary p-6"
      >
        <div>
          <div class="flex items-center mb-6 justify-between">
            <a href="/" class="logo btn btn-ghost">
              <img src="/svelte_logo.png" alt="" class="h-[inherit]" />
            </a>
            <button class="btn btn-ghost" {...$close} use:close>
              <X />
            </button>
          </div>
          <div class="flex flex-col">
            <NavLinks />
            {#if user}
              <a href="/account" use:close class="btn btn-secondary mb-2"
                >Your Profile</a
              >
              <form action="/auth?/logout" method="POST">
                <button type="submit" class="btn btn-secondary w-full"
                  >Sign Out</button
                >
              </form>
            {:else}
              <a href="/auth" use:close class="btn btn-secondary">Sign In</a>
            {/if}
          </div>
        </div>
        <div class="flex flex-col">
          1234 Main St<br />
          New York, NY 10001
        </div>
      </div>
    </div>
  {/if}
</div>
