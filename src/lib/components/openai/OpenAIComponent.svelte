<script context="module" lang="ts">
  import { redirect } from '@sveltejs/kit';

  export async function load({ locals }) {
    const user = locals.user;

    if (!user) {
      throw redirect(302, '/auth');
    }

    return { user };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let userPrompt = "";
  let responseMessage = "";
  let responseImage = "";
  let isVisible = false;
  let isDragging = false;
  let offset = { x: 0, y: 0 };
  let isTargetPresent = false;
  let chatHistory = writable([]);
  
  export let user;

  const checkTargetPresence = () => {
    const targetDiv = document.getElementById("responseTarget");
    isTargetPresent = !!targetDiv;
  };

  const insertHTML = (html) => {
    const cleanedHtml = html.replace(/<\/?(html|head|body|meta|link|title)[^>]*>/gi, '');
    const target = document.getElementById("responseTarget");
    if (target) {
      target.innerHTML = cleanedHtml;
    }
  };

  const handleSubmit = async () => {
    const inputPrompt = userPrompt.trim();
    if (inputPrompt.startsWith("image:")) {
      await getImageResponse(inputPrompt.replace("image:", "").trim());
    } else {
      await getGPTResponse(inputPrompt);
    }
  };

  async function getGPTResponse(inputPrompt) {
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputPrompt }),
    });
    const data = await response.json();
    if (data.response) {
      responseMessage = data.response;
      insertHTML(responseMessage);
      updateChatHistory(inputPrompt, data.response);
    } else {
      responseMessage = "Error fetching GPT response";
    }
  }

  async function getImageResponse(inputPrompt) {
    const response = await fetch("/api/dalle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputPrompt }),
    });
    const data = await response.json();
    if (data.image_url) {
      responseImage = data.image_url;
      insertHTML(`<img src="${responseImage}" alt="Generated Image">`);
      updateChatHistory(inputPrompt, `<img src="${responseImage}" alt="Generated Image">`);
    } else {
      responseMessage = "Error fetching image response";
    }
  }

  const updateChatHistory = (userMessage, botResponse) => {
    chatHistory.update(history => [...history, { userMessage, botResponse }]);
  };

  const toggleVisibility = () => {
    isVisible = !isVisible;
    if (isVisible) checkTargetPresence();
  };

  const handleDragStart = (event) => {
    isDragging = true;
    offset = {
      x: event.clientX - event.target.getBoundingClientRect().left,
      y: event.clientY - event.target.getBoundingClientRect().top,
    };
  };

  const handleDragEnd = () => {
    isDragging = false;
  };

  const handleDrag = (event) => {
    if (isDragging) {
      const button = document.querySelector(".openai-tab");
      if (button) {
        button.style.left = `${event.clientX - offset.x}px`;
        button.style.top = `${event.clientY - offset.y}px`;
      }
    }
  };

  const fetchChatHistory = async () => {
    if (user) {
      const response = await fetch(`/api/chat/${user.id}`);
      const data = await response.json();
      chatHistory.set(data);
    } else {
      console.error('User is not defined');
    }
  };

  onMount(() => {    
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("mousemove", handleDrag);
    checkTargetPresence();
    fetchChatHistory();
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="openai-tab flex items-center justify-center bg-primary text-primary-content p-2 rounded-l-lg cursor-pointer"
  on:mousedown={handleDragStart}
  on:mouseup={handleDragEnd}
  on:mousemove={handleDrag}
  on:click={toggleVisibility}
>
  <div class="text-sm">{isVisible ? "Hide" : "Show"}</div>
</div>

<div
  class={`openai-component card shadow-lg fixed right-0 top-1/2 border-primary border-2 rounded ${isVisible ? "visible" : ""}`}
>
  <div class="card-body bg-base-100">
    <div class="flex items-center">
      <div>AI Helper</div>
    </div>
    <textarea
      bind:value={userPrompt}
      placeholder="Enter your message"
      class="textarea textarea-bordered w-full mt-4"
    ></textarea>
    <button on:click={handleSubmit} class="btn btn-secondary mt-2">Submit</button>
    <div class="chat-history mt-4">
      {#each $chatHistory as { user_message, bot_response }}
        <p><strong>You:</strong> {user_message }</p>
        <p><strong>Bot:</strong> {@html bot_response.replace(/<\/?(html|head|body|meta|link|title)[^>]*>/gi, '')}</p>
        <hr class="my-4">
        {/each}
    </div>
  </div>
</div>

<style>
  .openai-tab {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: #113f70;
    color: white;
    padding: 5px;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
  }

  .openai-component {
    transform: translateY(-50%) translateX(100%);
    transition: transform 0.3s;
  }

  .openai-component.visible {
    transform: translateY(-50%) translateX(0);
  }

  .chat-history {
    max-height: 200px;
    overflow-y: auto;
  }
</style>
