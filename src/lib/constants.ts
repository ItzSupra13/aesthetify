export const MODELS = [
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    providers: ["openai", "azure"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-opus-4-20250514",
    name: "Claude 4 Opus",
    providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    providers: ["google", "google-vertex"],
  },
];

export const suggestions = [
  "What are the latest trends in AI?",
  "How does machine learning work?",
  "Explain quantum computing",
  "Best practices for React development",
];