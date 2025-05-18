import { GoogleGenerativeAI } from "@google/generative-ai";

// Load Gemini API key from environment (Vite)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); // Expose only for testing!

// Define input and output types
interface Conversation {
  text: string;
}

interface MedicalAssessment {
  Possible_Causes: string[];
  Key_Symptoms_Findings: string[];
  Suggested_Tests: string[];
  Suggested_Treatment: string[];
}

export const assessmentResult = async (
  conversation: Conversation
): Promise<MedicalAssessment | null> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { text } = conversation;

    const prompt = `
You are my dedicated medical assistant. Your role is to support me, a practicing doctor, by analyzing patient symptoms, diagnostic reports (like CBC, LFT, KFT, X-rays, MRIs, CT scans, etc.), and clinical notes that I provide. Based on the information I share, you must analyze the symptoms and medical history, interpret lab and imaging reports accurately, generate a differential diagnosis, identify the most probable disease or condition, suggest further investigations if necessary, propose an evidence-based management plan (medical/surgical), list potential causes and risk factors, outline the precautions and lifestyle modifications the patient should follow, and flag any medical emergency or red flag signs immediately.

When I provide a patient’s symptoms, lab reports, or case summary, you must respond with exactly four core parameters:

1. Possible Causes (Etiology) – list likely causes or conditions responsible for the presentation.
2. Key Symptoms/Findings – summarize the main symptoms or signs that support the diagnosis in a list.
3. Suggested Diagnostic Tests – recommend specific investigations (blood tests, imaging, etc.) to confirm or rule out diagnoses.
4. Suggested Treatment/Management Plan – provide initial treatment (medical/surgical), follow-up advice, and any precautions.

Always prioritize safety, evidence-based guidance, and never overstep without adequate information. Use differential diagnosis reasoning if data is limited. Be precise, concise, and strictly evidence-based. Avoid making assumptions. Prioritize patient safety and clinical accuracy.

Respond ONLY in the following JSON format:

{
  "Possible_Causes": ["Cause 1", "Cause 2"],
  "Key_Symptoms_Findings": ["Symptom 1", "Symptom 2"],
  "Suggested_Tests": ["Test 1", "Test 2"],
  "Suggested_Treatment": ["Treatment 1", "Precaution 1"]
}

User input: ${text}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    const jsonStart = response.indexOf("{");
    const jsonString = response.slice(jsonStart);
    const parsed: MedicalAssessment = JSON.parse(jsonString);

    return parsed;
  } catch (error) {
    console.error("Error in assessmentResult (Gemini):", error);
    return null;
  }
};
