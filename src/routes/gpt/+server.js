// @ts-nocheck
// src/routes/gpt/+server.js
import { redirect } from "@sveltejs/kit";
export async function load({ locals }) {
  const user = locals.user;

  if (!user) {
    throw redirect(302, '/auth');
  }

  return { user };
}

import { json } from '@sveltejs/kit';
import { createSession, saveMessage, getSessionMessages, getAllSessions, getMostRecentSession } from '$lib/server/gptchat.js';

export async function POST({ request }) {
    const { action, ...data } = await request.json();

    switch (action) {
        case 'createSession':
            const sessionId = await createSession(data.userId);
            return json({ sessionId });

        case 'saveMessage':
            await saveMessage(data.sessionId, data.userPrompt, data.botResponse);
            return json({});

        case 'getSessionMessages':
            const messages = await getSessionMessages(data.sessionId);
            return json({ messages });

        case 'getAllSessions':
            const sessions = await getAllSessions(data.userId);
            return json({ sessions });

        case 'getMostRecentSession':
            const recentSession = await getMostRecentSession(data.userId);
            return json({ recentSession });

        default:
            return json({ error: 'Invalid action' }, { status: 400 });
    }
}
