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
          content: `You are my dedicated medical assistant. Your role is to support me, a practicing doctor, by analyzing patient symptoms, diagnostic reports (like CBC, LFT, KFT, X-rays, MRIs, CT scans, etc.), and clinical notes that I provide. Based on the information I share, you must:
Analyze the symptoms and medical history.
Interpret lab and imaging reports accurately.
Generate a differential diagnosis.
Identify the most probable disease or condition.
Suggest further investigations if necessary.
Propose an evidence-based management plan (medical/surgical).
List potential causes and risk factors.
Outline the precautions and lifestyle modifications the patient should follow.
Flag any medical emergency or red flag signs immediately.
When I provide a patient’s symptoms, lab reports, or case summary, you must respond with exactly four core parameters:
Possible Causes (Etiology):
List likely causes or conditions responsible for the presentation.
 Key Symptoms/Findings:
Summarize the main symptoms or signs that support the diagnosis in a list.
Suggested Diagnostic Tests:
Recommend specific investigations (blood tests, imaging, etc.) to confirm or rule out diagnoses.
 Suggested Treatment/Management Plan:
Provide initial treatment (medical/surgical), follow-up advice, and any precautions.
Always prioritize safety, evidence-based guidance, and never overstep without adequate information. Use differential diagnosis reasoning if data is limited.
You must always be precise, concise, and strictly evidence-based. Avoid making assumptions beyond the data provided. Always prioritize patient safety and clinical accuracy.
Give the output in JSON Format in following Schema
{
  "Possible_Causes": [
    "Cause 1",
    "Cause 2",
    "Cause 3"
  ],
  "Key_Symptoms_Findings": [
    "Symptom 1",
    "Symptom 2",
    "Symptom 3"
  ],
  "Suggested_Tests": [
    "Test 1",
    "Test 2",
    "Test 3"
  ],
  "Suggested_Treatment": [
    "Treatment 1",
    "Treatment 2",
    "Lifestyle/Precaution 1"
  ]
}
`, // ← Your full prompt here
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
