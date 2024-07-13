<script lang="ts">
  // @ts-nocheck
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { Square } from "lucide-svelte";

  export let data;
  let user = data.user;

  let userId = user.id; // You can get this from your auth system
  let sessionId;
  let userPrompt = "";
  let responseMessage = "";
  let messages = writable([]);
  let chatSessions = writable([]);
  let selectedModel = "gpt-4o"; // or any default model you are using

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
    await getSessionMessages(sessionId);
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
    console.log("data:", data);
    messages.set(data.messages);
    return data.messages;
  };

  const getAllSessionsWithMessages = async () => {
    const response = await fetch("/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "getAllSessionsWithMessages", userId }),
    });
    const data = await response.json();
    chatSessions.set(data.sessionsWithMessages);
  };

  const formatMessagesForBot = (messages) => {
    let chatArr = [];
    messages.forEach((c) => {
      chatArr.push({ role: "user", content: c.user_prompt });
      chatArr.push({ role: "assistant", content: c.bot_response });
    });
    return chatArr;
  };

  const extractAfterKeyword = (str, keyword) => {
    const parts = str.split(keyword);
    if (parts.length <= 1) {
      return null; // or return an empty string, or throw an error, depending on your needs
    }
    return parts[1];
  };

  const getGPTResponse = async (inputPrompt) => {
    let chatHistory = await getSessionMessages();
    // working on doing this more streamlined..
    const parts = inputPrompt.split("image:::");
    const isImage = parts.length > 1;
    console.log("is image:", isImage);
    chatHistory = formatMessagesForBot(chatHistory);
    if (isImage) {
      chatHistory.push({
        role: "user",
        content: [
          { type: "text", text: parts[0] },
          { type: "image_url", image_url: { url: parts[1] } },
        ],
      });
    } else {
      chatHistory.push({ role: "user", content: inputPrompt });
    }
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: chatHistory,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to get GPT response");
    }
    const data = await response.json();
    return data.response;
  };
  const getDalleResponse = async (inputPrompt) => {
    const response = await fetch("/api/dalle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPrompt: inputPrompt,
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
      let botResponse = !userPrompt.startsWith("image:")
        ? await getGPTResponse(userPrompt)
        : await getDalleResponse(userPrompt);

      console.log("botresponse:", botResponse);
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

  const generateSessionTitle = async (sessId) => {
    const response = await fetch("/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "generateTitle", sessId }),
    });
    const data = await response.json();
    return data.title;
  };

  const deleteSession = async (sessId) => {
    await fetch("/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deleteSession",
        sessId,
      }),
    });

    // Update the session title in the UI
    chatSessions.update((sessions) =>
      sessions.map((session) =>
        session.id === sessionId ? { ...session, title } : session
      )
    );
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
    await fetchMostRecentSession();
    await getAllSessionsWithMessages();
  });
</script>

<div class="drawer drawer-mobile pb-[20vh]">
  <input id="drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <main class="flex flex-col h-full p-4">
      <div class="flex justify-between items-center mb-4">
        <select class="select select-bordered" bind:value={selectedModel}>
          <option value="gpt-4o">gpt-4o</option>
          <!-- Add more models as needed -->
        </select>
        <label for="drawer" class="btn btn-secondary drawer-button">
          Toggle Sidebar
        </label>
      </div>
      <div
        class="chat-box flex-grow overflow-y-auto p-4 bg-base-200 rounded-lg"
      >
        {#each $messages as { bot_response, user_prompt }}
          <div class="chat chat-start">
            <div class="chat-bubble">
              {#if bot_response?.startsWith("http")}
                <img src={bot_response} class="w-1/2 h-auto" alt="" />
              {:else}
                <p>{@html bot_response}</p>
              {/if}
            </div>
          </div>
          <div class="chat chat-end">
            <div class="chat-bubble">
              <p>{@html user_prompt}</p>
            </div>
          </div>
        {/each}
      </div>
    </main>
  </div>
  <aside class="drawer-side">
    <label for="drawer" class="drawer-overlay"></label>
    <div class="menu p-4 w-80 bg-base-100 text-base-content mt-[20vh]">
      <button class="btn btn-primary mb-4" on:click={createNewSession}
        >New Session</button
      >
      <ul>
        {#each $chatSessions as session}
          <li class="relative">
            <button
              on:click={deleteSession(session.id)}
              class="absolute top-0 right-0"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-square-x absolute right-0 top-0"
                ><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path
                  d="m15 9-6 6"
                /><path d="m9 9 6 6" /></svg
              ></button
            >
            <a class="menu-item" on:click={() => handleSessionClick(session)}>
              {session.id} - {#await generateSessionTitle(session.id)}
                <span class="loading loading-ring loading-lg"></span>
              {:then { content }}
                <div class="truncate w-3/4">
                  {content}
                </div>
              {/await}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </aside>
</div>
<div class="fixed bottom-4 w-full bg-base-100 p-4 h-[20vh]">
  <textarea
    class="textarea textarea-bordered w-full"
    bind:value={userPrompt}
    placeholder="Enter your message"
  ></textarea>
  <button class="btn btn-primary mt-2 w-full" on:click={saveMessage}
    >Send</button
  >
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
  /* .chat-box {
    max-height: 70vh;
    overflow-y: auto;
  } */
</style>
