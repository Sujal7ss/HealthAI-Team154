import OpenAI from "openai";

// Load API key from environment variable
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});


// Define the expected input shape
interface Conversation {
  text: string;
}

// Define the expected output schema
interface MedicalAssessment {
  Possible_Causes: string[];
  Key_Symptoms_Findings: string[];
  Suggested_Tests: string[];
  Suggested_Treatment: string[];
}

export const assessmentResult = async (conversation: Conversation): Promise<MedicalAssessment | null> => {
  try {
    const { text } = conversation;

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content:
            "You are my dedicated medical assistant. Your role is to support me, a practicing doctor, by analyzing patient symptoms, diagnostic reports (like CBC, LFT, KFT, X-rays, MRIs, CT scans, etc.), and clinical notes that I provide. Based on the information I share, you must analyze the symptoms and medical history, interpret lab and imaging reports accurately, generate a differential diagnosis, identify the most probable disease or condition, suggest further investigations if necessary, propose an evidence-based management plan (medical/surgical), list potential causes and risk factors, outline the precautions and lifestyle modifications the patient should follow, and flag any medical emergency or red flag signs immediately. When I provide a patient’s symptoms, lab reports, or case summary, you must respond with exactly four core parameters: Possible Causes (Etiology) – list likely causes or conditions responsible for the presentation; Key Symptoms/Findings – summarize the main symptoms or signs that support the diagnosis in a list; Suggested Diagnostic Tests – recommend specific investigations (blood tests, imaging, etc.) to confirm or rule out diagnoses; Suggested Treatment/Management Plan  provide initial treatment (medical/surgical), follow-up advice, and any precautions. Always prioritize safety, evidence-based guidance, and never overstep without adequate information. Use differential diagnosis reasoning if data is limited. You must always be precise, concise, and strictly evidence-based. Avoid making assumptions beyond the data provided. Always prioritize patient safety and clinical accuracy. Give the output in JSON Format in the following Schema: { \"Possible_Causes\": [ \"Cause 1\", \"Cause 2\", \"Cause 3\" ], \"Key_Symptoms_Findings\": [ \"Symptom 1\", \"Symptom 2\", \"Symptom 3\" ], \"Suggested_Tests\": [ \"Test 1\", \"Test 2\", \"Test 3\" ], \"Suggested_Treatment\": [ \"Treatment 1\", \"Treatment 2\", \"Lifestyle/Precaution 1\" ] }",
        },
        {
          role: "assistant",
          content:
            "Understood, I’m ready to assist you with patient cases. Please provide the clinical details, and I will respond strictly in the specified JSON format.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const result = response.choices[0].message.content;

    if (!result) throw new Error("No content returned from OpenAI");

    // Try parsing JSON
    const parsed: MedicalAssessment = JSON.parse(result);
    return parsed;
  } catch (error) {
    console.error("Error in assessmentResult:", error);
    return null;
  }
};
