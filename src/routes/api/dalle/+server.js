import OpenAI from "openai";
import { json } from '@sveltejs/kit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-W2FPHwDBUnj9oovD65N5M19I",
});

export async function POST({ request }) {
  const { prompt } = await request.json();

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
    });

    const imageUrl = response.data[0].url;
    return json({ image_url: imageUrl });
  } catch (error) {
    console.log("error::", error);
    return json({ error: 'Error generating image' }, { status: 500 });
  }
}
