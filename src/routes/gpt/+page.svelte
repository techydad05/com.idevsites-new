<script lang="ts">
  // @ts-nocheck
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let data;
  let user = data.user;

  let userId = user.id; // You can get this from your auth system
  let sessionId;
  let userPrompt = "";
  let responseMessage = "";
  let messages = writable([]);
  let chatSessions = writable([]);
  let selectedModel = "text-davinci-003"; // or any default model you are using

  const fetchAllSessions = async () => {
    const response = await fetch("/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "getAllSessions", userId }),
    });
    const data = await response.json();
    console.log("allsess:", data);
    chatSessions.set(data.sessions);
  };

  const fetchMostRecentSession = async () => {
    const response = await fetch("/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "getMostRecentSession", userId }),
    });
    const data = await response.json();
    console.log("recentsess:", data);

    sessionId = data.recentSession.id;
    await getSessionMessages();
  };

  const getSessionMessages = async () => {
    const response = await fetch("/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "getSessionMessages", sessionId }),
    });
    const data = await response.json();
    console.log("messages:", data);
    messages.set(data.messages);
  };

  const getGPTResponse = async (inputPrompt) => {
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputPrompt,
        model: selectedModel,
        sessionId: sessionId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to get GPT response");
    }
    const data = await response.json();
    return data.response;
  };

  const saveMessage = async () => {
    try {
      // Get the GPT response first
      const botResponse = await getGPTResponse(userPrompt);

      // Save the user prompt and GPT response to the database
      await fetch("/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "saveMessage",
          sessionId,
          userPrompt,
          botResponse,
        }),
      });

      // Update the messages in the UI
      messages.update((msgs) => [
        ...msgs,
        { role: "user", content: userPrompt },
        { role: "bot", content: botResponse },
      ]);
      userPrompt = "";
      await getSessionMessages(); // Ensure messages are refreshed after saving
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const createNewSession = async () => {
    await createSession();
    chatSessions.update((sessions) => [
      ...sessions,
      { id: sessionId, title: `Session ${sessionId}`, messages: [] },
    ]);
  };

  const handleSessionClick = async (session) => {
    sessionId = session.id;
    await getSessionMessages();
  };

  onMount(async () => {
    await fetchAllSessions();
    await fetchMostRecentSession();
  });

  // Other functions and onMount
</script>

<div class="drawer drawer-mobile">
  <input id="drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <main class="flex flex-col h-full p-4">
      <div class="flex justify-between items-center mb-4">
        <select class="select select-bordered" bind:value={selectedModel}>
          <option value="text-davinci-003">text-davinci-003</option>
          <option value="text-curie-001">text-curie-001</option>
          <!-- Add more models as needed -->
        </select>
        <label for="drawer" class="btn btn-secondary drawer-button">
          Toggle Sidebar
        </label>
      </div>
      <div
        class="chat-box flex-grow overflow-y-auto p-4 bg-base-200 rounded-lg"
      >
        {#each [...$messages].reverse() as message}
          <div class="chat chat-start">
            <div class="chat-bubble">
              <p>{@html message.bot_response}</p>
            </div>
          </div>
          <div class="chat chat-end">
            <div class="chat-bubble">
              <p>{@html message.user_prompt}</p>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-4">
        <textarea
          class="textarea textarea-bordered w-full"
          bind:value={userPrompt}
          placeholder="Enter your message"
        ></textarea>
        <button class="btn btn-primary mt-2 w-full" on:click={saveMessage}
          >Send</button
        >
      </div>
    </main>
  </div>
  <aside class="drawer-side">
    <label for="drawer" class="drawer-overlay"></label>
    <div class="menu p-4 w-80 bg-base-100 text-base-content">
      <button class="btn btn-primary mb-4" on:click={createNewSession}
        >New Session</button
      >
      <ul>
        {#each $chatSessions as session}
          <li>
            <a class="menu-item" on:click={() => handleSessionClick(session)}>
              {session.id}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </aside>
</div>

<!-- <script lang="ts">
  import { onMount } from "svelte";
  import { writable, get } from "svelte/store";

  export let data;
  const user = data.user;

  let userPrompt = "";
  let responseMessage = "";
  let responseImage = "";
  let chatSessions = writable([]);
  let currentSession = writable({ messages: [] });
  let models = ["GPT-3", "GPT-4"];
  let selectedModel = "GPT-4";

  const createNewSession = () => {
    const newSession = {
      id: Date.now(),
      title: `New Session ${new Date().toLocaleDateString()}`,
      messages: [],
    };
    chatSessions.update((sessions) => [newSession, ...sessions]);
    currentSession.set(newSession);
  };

  const fetchChatSessions = async () => {
    try {
      const response = await fetch("/api/chat/sessions");
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const sessions = await response.json();
      chatSessions.set(sessions);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
    }
  };

  onMount(() => {
    fetchChatSessions();
  });

  const handleSubmit = async () => {
    const inputPrompt = userPrompt.trim();
    if (!inputPrompt) {
      console.error("Prompt is empty");
      return;
    }
    if (inputPrompt.startsWith("image:")) {
      await getImageResponse(inputPrompt.replace("image:", "").trim());
    } else {
      await getGPTResponse(inputPrompt);
    }
  };

  async function getGPTResponse(inputPrompt) {
    const session = get(currentSession);
    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputPrompt,
          model: selectedModel,
          sessionId: session.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to get GPT response");
      }
      const data = await response.json();
      if (data.response) {
        responseMessage = data.response;
        session.messages.push({ role: "user", content: userPrompt });
        session.messages.push({ role: "bot", content: responseMessage });
        currentSession.set(session);
        userPrompt = "";
      } else {
        responseMessage = "Error fetching GPT response";
      }
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }
  }

  async function getImageResponse(inputPrompt) {
    const session = get(currentSession);
    try {
      const response = await fetch("/api/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      });
      if (!response.ok) {
        throw new Error("Failed to get image response");
      }
      const data = await response.json();
      if (data.image_url) {
        responseImage = data.image_url;
        session.messages.push({ role: "user", content: userPrompt });
        session.messages.push({
          role: "bot",
          content: `<img src="${responseImage}" alt="Generated Image">`,
        });
        currentSession.set(session);
        userPrompt = "";
      } else {
        responseMessage = "Error fetching image response";
      }
    } catch (error) {
      console.error("Error fetching image response:", error);
    }
  }

  const updateChatHistory = (userMessage, botResponse) => {
    currentSession.update((session) => {
      session.messages.push({ role: "user", content: userMessage });
      session.messages.push({ role: "bot", content: botResponse });
      return session;
    });
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`/api/chat/${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }
      const data = await response.json();
      chatSessions.set(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  onMount(() => {
    fetchChatHistory();
  });
</script>

<div class="drawer drawer-mobile">
  <input id="drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <main class="flex flex-col h-full p-4">
      <div class="flex justify-between items-center mb-4">
        <select class="select select-bordered" bind:value={selectedModel}>
          {#each models as model}
            <option value={model}>{model}</option>
          {/each}
        </select>
        <label for="drawer" class="btn btn-secondary drawer-button">
          Toggle Sidebar
        </label>
      </div>
      <div
        class="chat-box flex-grow overflow-y-auto p-4 bg-base-200 rounded-lg"
      >
        {#each $currentSession.messages as message}
          <div
            class={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}
          >
            <div class="chat-bubble">
              <p>{@html message.content}</p>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-4">
        <textarea
          class="textarea textarea-bordered w-full"
          bind:value={userPrompt}
          placeholder="Enter your message"
        ></textarea>
        <button class="btn btn-primary mt-2 w-full" on:click={handleSubmit}
          >Send</button
        >
      </div>
    </main>
  </div>
  <aside class="drawer-side">
    <label for="drawer" class="drawer-overlay"></label>
    <div class="menu p-4 w-80 bg-base-100 text-base-content">
      <button class="btn btn-primary mb-4" on:click={createNewSession}
        >New Session</button
      >
      <ul>
        {#each $chatSessions as session}
          <li>
            <a class="menu-item" on:click={() => currentSession.set(session)}
              >{session.title}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </aside>
</div>

<style>
  .chat-box {
    max-height: 70vh;
    overflow-y: auto;
  }
</style> -->

<style>
  .chat-box {
    max-height: 70vh;
    overflow-y: auto;
  }
</style>
