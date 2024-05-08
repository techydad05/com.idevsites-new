<script lang="ts">
   import type { PageData } from "./$types";
   import { Turnstile } from "sveltekit-turnstile";
   import { superForm } from "sveltekit-superforms/client";
   import { page } from "$app/stores";
   import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
   import {
      loginPostReq,
      registerPostReq,
      forgotPostReq,
      resetPostReq,
   } from "$lib/validators";
   import AuthContainer from "$lib/components/AuthContainer.svelte";
   import SocialProviders from "$lib/components/SocialProviders.svelte";
   import Label from "$src/lib/components/AceternityComponents/Label.svelte";
   import Input from "$src/lib/components/AceternityComponents/Input.svelte";

   export let data: PageData;
   // console.log("data:", data);

   type state = "signin" | "signup" | "forgot" | "reset";
   let state = data.code ? "reset" : "signin";
   let token: string =
      PUBLIC_TURNSTILE_SITE_KEY === "" ? "no-token-required" : "";

   const {
      form: loginForm,
      errors: loginErrors,
      message: loginMessage,
      enhance: loginEnhance,
   } = superForm(data.loginForm, {
      validators: loginPostReq,
      invalidateAll: true,
      onUpdate: () => {
         token = token === "no-token-required" ? "no-token-required" : "";
      },
      taintedMessage: null,
   });

   const {
      form: registerForm,
      errors: registerErrors,
      message: registerMessage,
      enhance: registerEnhance,
   } = superForm(data.registerForm, {
      validators: registerPostReq,
      invalidateAll: true,
      onUpdate: () => {
         token = token === "no-token-required" ? "no-token-required" : "";
      },
      taintedMessage: null,
   });

   const {
      form: forgotForm,
      errors: forgotErrors,
      message: forgotMessage,
      enhance: forgotEnhance,
   } = superForm(data.forgotForm, {
      validators: forgotPostReq,
      invalidateAll: true,
      onUpdate: () => {
         token = token === "no-token-required" ? "no-token-required" : "";
      },
      taintedMessage: null,
   });

   const {
      form: resetForm,
      errors: resetErrors,
      message: resetMessage,
      enhance: resetEnhance,
   } = superForm(data.resetForm, {
      validators: resetPostReq,
      invalidateAll: true,
      onUpdate: () => {
         token = token === "no-token-required" ? "no-token-required" : "";
      },
      taintedMessage: null,
   });

   $resetForm.code = data.code;

   $loginForm.rurl = data.rurl || "";
   $registerForm.rurl = data.rurl || "";
   $forgotForm.rurl = data.rurl || "";
   $resetForm.rurl = data.rurl || "";

   $: $loginForm.token = token;
   $: $registerForm.token = token;
   $: $forgotForm.token = token;
   $: $resetForm.token = token;
</script>

<AuthContainer>
   {#if !token}
      <div
         class="fixed top-0 left-0 z-50 w-full h-screen overflow-y-auto bg-black flex items-center justify-center"
      >
         <Turnstile
            theme="dark"
            siteKey={PUBLIC_TURNSTILE_SITE_KEY}
            on:turnstile-callback={(e) => {
               console.log("e:", e);
               token = e.detail.token;
            }}
         />
      </div>
   {:else if state === "signin"}
      <div class="flex h-full items-center justify-center flex-nowrap flex-col">
         <h3 class="mb-6 font-normal text-6xl">
            Sign In or <a
               class="link link-primary no-underline"
               on:click={() => (state = "signup")}>Sign Up</a
            >
         </h3>
         <form action="?/login" method="POST" class="w-full" use:loginEnhance>
            <input type="hidden" name="rurl" value={$loginForm.rurl} />
            <input type="hidden" name="token" bind:value={$loginForm.token} />
            <div class="form-control gap-2">
               <Label htmlFor="email" class="text-neutral-100"
                  >Email Address</Label
               >
               <Input
                  id="email"
                  placeholder=""
                  name="email"
                  type="email"
                  autocomplete="email"
                  aria-invalid={$loginErrors.email ? "true" : undefined}
                  bind:value={$loginForm.email}
               />
               {#if $loginErrors.email}<span class="invalid font-bold"
                     >{$loginErrors.email}</span
                  >{/if}
            </div>
            <div class="form-control gap-2">
               <Label htmlFor="password" class="text-neutral-100"
                  >Password</Label
               >
               <Input
                  id="password"
                  placeholder=""
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  aria-invalid={$loginErrors.password ? "true" : undefined}
                  bind:value={$loginForm.password}
               />
               {#if $loginMessage}<span class="invalid font-bold">
                     {$loginMessage}
                  </span>{/if}
            </div>
            <button type="submit" class="btn btn-primary w-full my-4">Sign In</button>
            <SocialProviders />
            <div class="text-sm text-center font-medium">
               <a
                  on:click={() => {
                     state = "forgot";
                  }}
                  class="link link-primary no-underline"
               >
                  Forgot your password?
               </a>
            </div>
         </form>
      </div>
   {:else if state === "signup"}
      <h3 class="mb-6 font-normal text-6xl mt-4">
         Create an Account or <a
            class="link link-primary no-underline"
            on:click={() => (state = "signin")}>Sign In</a
         >
      </h3>
      <form action="?/register" method="POST" class="pb-4" use:registerEnhance>
         <input type="hidden" name="rurl" value={$registerForm.rurl} />
         <input type="hidden" name="token" bind:value={$registerForm.token} />
         <div class="form-control gap-2">
            <Label htmlFor="email" class="text-neutral-100">First Name</Label>
            <Input
               id="firstName"
               placeholder=""
               name="firstName"
               type="text"
               autocomplete="given-name"
               aria-invalid={$registerErrors.firstName ? "true" : undefined}
               bind:value={$registerForm.firstName}
            />
            {#if $registerErrors.firstName}<span class="invalid font-bold"
                  >{$registerErrors.firstName}</span
               >{/if}
         </div>
         <div class="form-control gap-2">
            <Label htmlFor="email" class="text-neutral-100">Last Name</Label>
            <Input
               id="email"
               name="lastName"
               type="text"
               autocomplete="family-name"
               aria-invalid={$registerErrors.lastName ? "true" : undefined}
               bind:value={$registerForm.lastName}
            />
            {#if $registerErrors.lastName}<span class="invalid font-bold"
                  >{$registerErrors.lastName}</span
               >{/if}
         </div>
         <div class="form-control gap-2">
            <Label htmlFor="email" class="text-neutral-100">Email</Label>
            <Input
               id="email"
               name="email"
               type="email"
               autocomplete="email"
               aria-invalid={$registerErrors.email ? "true" : undefined}
               bind:value={$registerForm.email}
            />
            {#if $registerErrors.email}<span class="invalid font-bold"
                  >{$registerErrors.email}</span
               >{/if}
         </div>
         <div class="form-control gap-2">
            <Label htmlFor="email" class="text-neutral-100">Password</Label>
            <Input
               id="password"
               name="password"
               type="password"
               autocomplete="new-password"
               aria-invalid={$registerErrors.password ? "true" : undefined}
               bind:value={$registerForm.password}
            />
            {#if $registerErrors.password}<span class="invalid font-bold"
                  >{$registerErrors.password}</span
               >{/if}
         </div>
         <div class="form-control gap-2">
            <Label htmlFor="email" class="text-neutral-100">Confirm Password</Label>
            <Input
               id="passwordConfirm"
               name="passwordConfirm"
               type="password"
               autocomplete="new-password"
               aria-invalid={$registerErrors.passwordConfirm
                  ? "true"
                  : undefined}
               bind:value={$registerForm.passwordConfirm}
            />
            {#if $registerErrors.passwordConfirm}<span class="invalid font-bold"
                  >{$registerErrors.passwordConfirm}</span
               >{/if}
         </div>
         {#if $registerMessage}<span class="invalid font-bold">
               {$registerMessage}
            </span>{/if}
         <button type="submit" class="btn btn-primary w-full my-4">Create Account</button>
         <SocialProviders />
      </form>
   {:else if state === "forgot"}
      {#if $forgotMessage}
         <div class="mt-2 text-sm" class:text-red-600={$page.status > 200}>
            {$forgotMessage}
         </div>
      {:else}
         <p class="my-4 text-center font-medium">Enter your email address</p>
         <form action="?/forgot" method="POST" use:forgotEnhance>
            <input type="hidden" name="rurl" value={$forgotForm.rurl} />
            <input type="hidden" name="token" bind:value={$forgotForm.token} />
            <label class="label">
               <div class="label-text">Email</div>
               <input
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="input"
                  aria-invalid={$forgotErrors.email ? "true" : undefined}
                  bind:value={$forgotForm.email}
               />
               {#if $forgotErrors.email}<span class="invalid"
                     >{$forgotErrors.email}</span
                  >{/if}
            </label>
            <button type="submit" class="button">Request Reset Code</button>
         </form>
      {/if}
   {:else if state === "reset"}
      <p class="my-4 text-center font-medium">Choose a new password</p>
      <form action="?/reset" method="POST" use:resetEnhance>
         <input type="hidden" name="rurl" value={$resetForm.rurl} />
         <input type="hidden" name="token" bind:value={$resetForm.token} />
         <input type="hidden" name="code" bind:value={$resetForm.code} />
         <label class="label">
            <div class="label-text">Email</div>
            <input
               name="email"
               type="email"
               autocomplete="email"
               class="input"
               aria-invalid={$resetErrors.email ? "true" : undefined}
               bind:value={$resetForm.email}
            />
            {#if $resetErrors.email}<span class="invalid"
                  >{$resetErrors.email}</span
               >{/if}
         </label>
         <label class="label">
            <div class="label-text">Password</div>
            <input
               name="password"
               type="password"
               autocomplete="new-password"
               class="input"
               aria-invalid={$resetErrors.password ? "true" : undefined}
               bind:value={$resetForm.password}
            />
            {#if $resetErrors.password}<span class="invalid"
                  >{$resetErrors.password}</span
               >{/if}
         </label>
         <label class="label">
            <div class="label-text">Confirm Password</div>
            <input
               name="passwordConfirm"
               type="password"
               autocomplete="new-password"
               class="input"
               aria-invalid={$resetErrors.passwordConfirm ? "true" : undefined}
               bind:value={$resetForm.passwordConfirm}
            />
            {#if $resetErrors.passwordConfirm}<span class="invalid"
                  >{$resetErrors.passwordConfirm}</span
               >{/if}
         </label>
         {#if $resetMessage}<div class="mt-2 text-sm text-red-600">
               {$resetMessage}
            </div>{/if}
         <button type="submit" class="button">Save New Password</button>
      </form>
   {/if}
</AuthContainer>

<style lang="postcss">
   .label {
      @apply block mb-4 text-gray-600;
   }
   .label-text {
      @apply ml-1 mb-2 font-semibold text-sm;
   }
   .input {
      @apply w-full block py-3 px-4 text-sm border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500;
   }
   .invalid {
      @apply block my-2 text-sm text-red-600;
   }
   .button {
      @apply inline-block w-full my-4 py-3 px-5 text-sm font-semibold text-white bg-lime-600 hover:bg-lime-700 rounded-md transition duration-200;
   }
</style>
