import { OpenAI } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key in environment variables.");
}

export const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const generateEmbeddings = async ({ text }: { text: string }) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  return response?.data[0]?.embedding;
};
