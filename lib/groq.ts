import { ChatGroq } from "@langchain/groq";

export const GROQ_DEFAULT_MODEL = "llama-3.3-70b-versatile";

function getGroqApiKey() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY environment variable.");
  }

  return apiKey;
}

type CreateGroqClientOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
};

export function createGroqClient(options: CreateGroqClientOptions = {}) {
  return new ChatGroq({
    apiKey: getGroqApiKey(),
    model: options.model ?? GROQ_DEFAULT_MODEL,
    temperature: options.temperature ?? 0.3,
    maxTokens: options.maxTokens ?? 2048,
    timeout: options.timeout ?? 60_000,
  });
}

export const groq = createGroqClient();
