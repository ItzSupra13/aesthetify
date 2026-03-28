import { google } from "@/server/google";
import { generateText } from "ai";

type GenerateProjectNameInput = {
  description: string;
};

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
`;

  try {
    console.log("INSIDE GENERATION");
    console.log("USING API KEY: ", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt, 
      temperature: 0.9,
      maxOutputTokens: 50,
    });

    console.log("GOT OUTPUT: ", text);

    return text.trim() || "Undefined Project";

  } catch (error) {
    console.error("GENERATE_PROJECT_NAME_ERROR:", error);
    return "Project Alpha"; 
  }
}