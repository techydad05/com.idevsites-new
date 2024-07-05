// @ts-nocheck
import { json } from "@sveltejs/kit";
import {
  getChatHistory,
  generateSessionTitle,
  createSession,
  saveMessage,
  getSessionMessages,
  getAllSessions,
  getAllSessionsWithMessages,
  getMostRecentSession,
  deleteSession,
} from "$lib/server/gptchat.js";

export async function POST({ request }) {
  const { action, ...data } = await request.json();

  switch (action) {
    case "createSession":
      const sessionId = await createSession(data.userId);
      return json({ sessionId });

    case "saveMessage":
      await saveMessage(data.sessionId, data.userPrompt, data.botResponse);
      return json({});

    case "getSessionMessages":
      const messages = await getSessionMessages(data.sessionId);
      return json({ messages });

    case "getAllSessions":
      const sessions = await getAllSessions(data.userId);
      return json({ sessions });

    case "getAllSessionsWithMessages":
      const sessionsWithMessages = await getAllSessionsWithMessages(
        data.userId
      );
      return json({ sessionsWithMessages });

    case "getMostRecentSession":
      const recentSession = await getMostRecentSession(data.userId);
      return json({ recentSession });

    case "generateTitle":
      const chatHistory = await getSessionMessages(data.sessId);
      const title = await generateSessionTitle(chatHistory);
      return json({ title });

    case "deleteSession":
        const response = await deleteSession(data.sessId);
        console.log("delete response:", response);

    default:
      return json({ error: "Invalid action" }, { status: 400 });
  }
}
