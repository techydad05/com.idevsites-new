import OpenAI from "openai";
import { json } from '@sveltejs/kit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-W2FPHwDBUnj9oovD65N5M19I",
});

export async function POST({ request }) {
    const { userPrompt } = await request.json();
    console.log("userprompt", userPrompt);
  
    if (!userPrompt) {
      return json({ error: "Invalid request" }, { status: 400 });
    }
  
    try {
      const response = await openai.images.generate({
        prompt: userPrompt,
        n: 1,
        response_format: "url"
      });
      console.log("response in image api:", response);
      return json({ response: response.data[0].url });
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return json(
        { error: "Failed to communicate with OpenAI service." },
        { status: 500 }
      );
    }
  }



