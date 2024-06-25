// src/routes/api/gpt/+server.js
import OpenAI from "openai";
import { json } from '@sveltejs/kit';
import { query } from '$lib/db';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-W2FPHwDBUnj9oovD65N5M19I",
});

export async function POST({ request }) {
  const { prompt, sessionId } = await request.json();

  try {
    // Fetch chat history from the database
    const historyRes = await query(
      'SELECT user_message, bot_response FROM chat_history WHERE session_id = $1 ORDER BY timestamp ASC',
      [sessionId]
    );

    const chatHistory = historyRes.rows;

    // Construct messages for the OpenAI API
    const messages = chatHistory.flatMap(({ user_message, bot_response }) => [
      { role: 'user', content: user_message },
      { role: 'assistant', content: bot_response },
    ]);
    messages.push({ role: 'user', content: prompt });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Use the GPT-4 model
      messages: messages,
    });

    const botResponse = response.choices[0].message.content;

    // Insert new chat interaction into the database
    await query(
      'INSERT INTO chat_history (session_id, user_message, bot_response) VALUES ($1, $2, $3)',
      [sessionId, prompt, botResponse]
    );

    return json({ response: botResponse });
  } catch (error) {
    console.log("error::", error);
    return json({ error: 'Error fetching GPT response' }, { status: 500 });
  }
}
