<script lang="ts">
	import { cn } from "../../utils/cn";
	import {
		IconBrandGithub,
		IconBrandGoogle,
		IconBrandOnlyfans,
	} from "@tabler/icons-svelte";
	import Input from "./Input.svelte";
	import Label from "./Label.svelte";
    import { goto } from "$app/navigation";
	export let state;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		console.log("Form submitted");
	};
</script>

<div class="fixed top-0 left-0 z-50 w-full h-screen overflow-y-auto bg-black flex items-center justify-center ">
	<div
		class="w-full max-w-md rounded-none border border-gray-300 bg-white p-4 shadow dark:border-gray-800 dark:bg-black md:rounded-2xl md:p-8"
	>
		<h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200">
			Welcome to idevsites.com
		</h2>
		<div class="pt-6 text-sm text-center font-medium">
            <span>Have an account?&nbsp;&nbsp;</span>
            <button type="button" on:click="{() => { state = 'signin' }}" class="text-orange-900 hover:text-orange-700">Sign In</button>
         </div>
		<div class="pt-6 text-sm text-center font-medium">
            <span>Don't have an account?&nbsp;&nbsp;</span>
            <button type="button" on:click="{() => { state = 'signup' }}" class="text-orange-900 hover:text-orange-700">Sign Up</button>
         </div>
		 {#if state === "signin" }
		 <form class="my-8" on:submit={handleSubmit}>
			<div class={"mb-4 flex w-full flex-col space-y-2"}>
				<Label htmlFor="email">Email Address</Label>
				<Input
					id="email"
					placeholder=""
					type="email"
				/>
			</div>
			<div class={cn("mb-4 flex w-full flex-col space-y-2")}>
				<Label htmlFor="password">Password</Label>
				<Input id="password" placeholder="••••••••" type="password" />
			</div>

			<button on:click={() => goto("/")}
				class="group/btn relative inline-block h-10 w-[49%] mr-[.5%] rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
				type="submit"
			>
				&larr; Go Back
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
			<button
				class="group/btn relative inline-block h-10 w-[49%] ml-[.5%] rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
				type="submit"
			>
				Sign in &rarr;
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>

			<div
				class="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700"
			/>

			<!-- <div class="flex flex-col space-y-4">
			<button
				class=" group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="submit"
			>
				<IconBrandGithub class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300"> GitHub </span>
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
			<button
				class=" group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="submit"
			>
				<IconBrandGoogle class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300"> Google </span>
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
			<button
				class=" group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="submit"
			>
				<IconBrandOnlyfans class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300"> OnlyFans </span>
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
		</div> -->
		</form>
		{:else if state === "signup"}
		<form class="my-8" on:submit={handleSubmit}>
			<div
				class="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0"
			>
				<div class={"flex w-full flex-col space-y-2"}>
					<Label htmlFor="firstname">First name</Label>
					<Input id="firstname" placeholder="Tyler" type="text" />
				</div>
				<div class={"flex w-full flex-col space-y-2"}>
					<Label htmlFor="lastname">Last name</Label>
					<Input id="lastname" placeholder="Durden" type="text" />
				</div>
			</div>
			<div class={"mb-4 flex w-full flex-col space-y-2"}>
				<Label htmlFor="email">Email Address</Label>
				<Input
					id="email"
					placeholder="projectmayhem@fc.com"
					type="email"
				/>
			</div>
			<div class={cn("mb-4 flex w-full flex-col space-y-2")}>
				<Label htmlFor="password">Password</Label>
				<Input id="password" placeholder="••••••••" type="password" />
			</div>

			<button on:click={() => goto("/")}
				class="group/btn relative inline-block h-10 w-[49%] mr-[.5%] rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
				type="submit"
			>
				&larr; Go Back
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
			<button
				class="group/btn relative inline-block h-10 w-[49%] ml-[.5%] rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
				type="submit"
			>
				Sign up &rarr;
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>

			<div
				class="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700"
			/>

			<!-- <div class="flex flex-col space-y-4">
			<button
				class=" group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="submit"
			>
				<IconBrandGithub class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300"> GitHub </span>
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
			<button
				class=" group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="submit"
			>
				<IconBrandGoogle class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300"> Google </span>
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
			<button
				class=" group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
				type="submit"
			>
				<IconBrandOnlyfans class="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
				<span class="text-sm text-neutral-700 dark:text-neutral-300"> OnlyFans </span>
				<span
					class="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100"
				/>
				<span
					class="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
				/>
			</button>
		</div> -->
		</form>
		 {/if}
	</div>
</div>
