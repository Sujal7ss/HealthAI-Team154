import ReverieClient from "reverie-client";

const reverieClient = new ReverieClient({
  apiKey: "e1169947b5614c49592f25e4f7ab54e06f5bc255",
  appId: "dev.sujalchahande3",
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
