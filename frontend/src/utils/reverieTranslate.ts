import ReverieClient from "reverie-client";

const reverieClient = new ReverieClient({
  apiKey: import.meta.env.VITE_REVERIE_API_KEY,
  appId: import.meta.env.VITE_REVERIE_APP_ID,
});

export async function translateText(
  text: string,
  srcLang: string,
  tgtLang: string
): Promise<string> {
  if (!text) return "";

  try {
    const result = await reverieClient.translate({
      text,
      src_lang: srcLang,
      tgt_lang: tgtLang,
    });
    if(result) {
     return result 
    
    } else {
      console.error("Translation failed or returned unexpected result:", result);
      return "";
    }
  } catch (error) {
    console.error("Reverie translation error:", error);
    return "";
  }
}
