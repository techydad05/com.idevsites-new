// src/routes/api/gpt/+server.js
import { json } from "@sveltejs/kit";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST({ request }) {
  const { prompt, model, sessionId } = await request.json();

  if (!prompt || !model) {
    return json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: model === "GPT-3" ? "text-davinci-003" : "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return json(
      { error: "Failed to communicate with OpenAI service." },
      { status: 500 }
    );
  }
}
