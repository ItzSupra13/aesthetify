import { openrouter } from "./openrouter"
import { streamText } from "ai"

type GenerateProjectNameInput = {
  description: string
}

export async function generateProjectName({
  description,
}: GenerateProjectNameInput) {
  const prompt = `
You are a world-class startup branding expert.

Generate ONE short, premium, brandable project name.

Rules:
- 5 words max
- Easy to pronounce
- No hyphens
- No explanation

Project description:
${description}

Return ONLY the name.
`

  const response = streamText({
    model: openrouter("google/gemini-2.5-flash"),
    temperature: 0.9,
    maxOutputTokens: 50,
    prompt,
  })

  await response.consumeStream()

  return response.text || "Undefined Name"
}
