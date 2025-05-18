import { useEffect, useRef, useState } from "react";
import { translateText } from "../../utils/reverieTranslate";
import { VoiceRecognitionResult } from "../../types";

export const useVoiceRecognition = (
  srcLang: string,
  tgtLang: string,
  onRecordingComplete: (result: VoiceRecognitionResult) => void
) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [interimTranslated, setInterimTranslated] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const recognitionRef = useRef<any>(null);
  const manualStopRef = useRef(false);

  // Accumulate final recognized text
  const conversationRef = useRef("");

  useEffect(() => {
    let interval: number | undefined;

    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = srcLang === "auto" ? "en-US" : srcLang;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsRecording(true);
      manualStopRef.current = false;
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim = transcript; // keep only last interim chunk
        }
      }

      if (interim) {
        setInterimTranscript(interim);

        // Translate interim transcript
        const detectedLang = recognition.lang.split("-")[0];
        try {
          const interimTranslatedText = await translateText(
            interim.trim(),
            detectedLang,
            tgtLang
          );
          setInterimTranslated(interimTranslatedText);
        } catch (err) {
          console.error("Interim translation error:", err);
          setInterimTranslated("");
        }
      } else {
        setInterimTranscript("");
        setInterimTranslated("");
      }

      if (final) {
        setFinalTranscript((prev) => prev + final);
        setInterimTranscript("");
        setInterimTranslated("");

        const detectedLang = recognition.lang.split("-")[0];
        try {
          const translated = await translateText(final.trim(), detectedLang, tgtLang);
          setTranslatedText((prev) => prev + translated + " ");
          conversationRef.current += translated + " ";

          // Pass the translated final text as manual input
          onRecordingComplete({
            text: conversationRef.current.trim(),
            confidence: 1,
            language: recognition.lang,
          });
        } catch (err) {
          console.error("Translation error:", err);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Recognition error:", event.error);
    };

    recognition.onend = () => {
      if (!manualStopRef.current) {
        startRecognition();
      } else {
        setIsRecording(false);
      }
    };

    recognition.start();
  };

  const stopRecognition = () => {
    manualStopRef.current = true;
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  return {
    isRecording,
    recordingTime,
    interimTranscript,
    interimTranslated,
    finalTranscript,
    translatedText,
    startRecognition,
    stopRecognition,
  };
};
