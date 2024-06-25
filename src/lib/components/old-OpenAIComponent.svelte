<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { v4 as uuidv4 } from 'uuid';

  let userPrompt = "";
  let responseMessage = "";
  let isVisible = false;
  let isDragging = false;
  let offset = { x: 0, y: 0 };
  let isTargetPresent = false;
  let chatHistory = writable([]);
  let sessionId = uuidv4(); // Unique session ID for each user session

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
    await getGPTResponse(userPrompt);
  };

  async function getGPTResponse(inputPrompt) {
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputPrompt, sessionId }),
    });
    const data = await response.json();
    if (data.response) {
      responseMessage = data.response;
      insertHTML(responseMessage);
      updateChatHistory(inputPrompt, responseMessage);
    } else {
      responseMessage = "Error fetching GPT response";
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
    const response = await fetch(`/api/chat/${sessionId}`);
    const data = await response.json();
    chatHistory.set(data);
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
      {#each $chatHistory as { userMessage, botResponse }}
        <p><strong>You:</strong> {userMessage}</p>
        <p><strong>Bot:</strong> {@html botResponse}</p>
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
