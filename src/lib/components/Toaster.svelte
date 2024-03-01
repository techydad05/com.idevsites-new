<script lang="ts" context="module">
    export type ToastData = {
        title: string;
        description: string;
        color: string;
        confirm: boolean;
    };

    const {
        elements: { content, title, description, close },
        helpers,
        states: { toasts },
        actions: { portal },
    } = createToaster<ToastData>();
    export const addToast = helpers.addToast;
    export let confirmed = false;
</script>

<script lang="ts">
    import { createToaster, melt } from "@melt-ui/svelte";
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
</script>

<div
    class="fixed right-0 top-0 z-[99] m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
    use:portal
>
    {#each $toasts as { id, data } (id)}
        <div
            use:melt={$content(id)}
            animate:flip={{ duration: 500 }}
            in:fly={{ duration: 150, x: "100%" }}
            out:fly={{ duration: 150, x: "100%" }}
            class="rounded-lg bg-neutral-800 text-white shadow-md"
        >
            <div
                class="{data.color} relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
            >
                <div>
                    <h3
                        use:melt={$title(id)}
                        class="flex items-center gap-2 font-semibold"
                    >
                        {data.title}
                        <span class="size-1.5 rounded-full" />
                    </h3>
                    <div use:melt={$description(id)}>
                        {data.description}
                    </div>
                </div>
                {#if data.confirm}
                    <div>
                        <button
                            on:click={() => (confirmed = true)}
                            use:melt={$close(id)}
                            class="btn btn-small btn-primary">Yes</button
                        >
                        <button
                            on:click={() => (confirmed = false)}
                            use:melt={$close(id)}
                            class="btn btn-small btn-secondary">No</button
                        >
                    </div>
                {:else}
                    <button
                        use:melt={$close(id)}
                        class="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-white
      hover:bg-magnum-900/50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                {/if}
            </div>
        </div>
    {/each}
</div>
