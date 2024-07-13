// src/routes/api/gpt/+server.js
import { json } from "@sveltejs/kit";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST({ request }) {
  const { model, messages } = await request.json();

  if (!model) {
    return json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages,
    });
    console.log("Response:", response);
    return json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return json(
      { error: "Failed to communicate with OpenAI service." },
      { status: 500 }
    );
  }
}
