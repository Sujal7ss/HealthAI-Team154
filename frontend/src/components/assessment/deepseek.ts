import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // e.g., "https://yourapp.com"
    "X-Title": "<YOUR_SITE_NAME>", // e.g., "Rural Health AI"
  },
  dangerouslyAllowBrowser: true,
});

// Types
interface Conversation {
  text: string;
}

export interface MedicalAssessment {
  Possible_Causes: string[];
  Key_Symptoms_Findings: string[];
  Suggested_Tests: string[];
  Suggested_Treatment: string[];
}

export const assessmentResult = async (
  conversation: Conversation
): Promise<MedicalAssessment | null> => {
  try {
    const { text } = conversation;

    const response = await client.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: `You are my dedicated medical assistant. Your role is to support me, a practicing doctor, by analyzing patient symptoms...`, // ← Your full prompt here
        },
        {
          role: "assistant",
          content: `Understood, I’m ready to assist you with patient cases. Please provide the clinical details, and I will respond strictly in the specified JSON format.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    console.log("Response from OpenRouter:", response);
    const raw = response.choices[0].message.content;

    if (!raw) throw new Error("No content returned from model");

    // Strip markdown code block if present
    const jsonStr = raw
      .trim()
      .replace(/^```json\n/, "")
      .replace(/\n```$/, "");

    console.log("Clean JSON string:", jsonStr);

    // Now you can parse it if needed
    const data = JSON.parse(jsonStr);
    return data;
  } catch (error) {
    console.error("Error in assessmentResult:", error);
    return null;
  }
};
