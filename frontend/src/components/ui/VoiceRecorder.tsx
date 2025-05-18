import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, StopCircle } from "lucide-react";
import { VoiceRecognitionResult } from "../../types";
import { translateText } from "../../utils/reverieTranslate";

interface VoiceRecorderProps {
  onRecordingComplete: (result: VoiceRecognitionResult) => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [srcLang, setSrcLang] = useState("auto");
  const [tgtLang, setTgtLang] = useState("en");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const recognitionRef = useRef<any>(null);
  const manualStopRef = useRef(false);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
          interim += transcript;
        }
      }

      if (interim) setInterimTranscript(interim);
      if (final) {
        setFinalTranscript((prev) => prev + final);
        setInterimTranscript("");

        const detectedLang = recognition.lang.split("-")[0];
        try {
          const translated = await translateText(final.trim(), detectedLang, tgtLang);
          setTranslatedText((prev) => prev + translated + " ");
        } catch (err) {
          console.error("Translation error:", err);
        }

        onRecordingComplete({
          text: final.trim(),
          confidence: 1,
          language: recognition.lang,
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Recognition error:", event.error);
    };

    recognition.onend = () => {
      if (!manualStopRef.current) {
        startRecognition(); // restart automatically
      } else {
        setIsRecording(false);
      }
    };

    recognition.start();
  };

  const stopRecording = () => {
    manualStopRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const languageOptions = [
    { code: "auto", name: "Auto-detect" },
    { code: "en", name: "English" },
    { code: "hi-IN", name: "Hindi" },
    { code: "bn-IN", name: "Bengali" },
    { code: "ta-IN", name: "Tamil" },
    { code: "te-IN", name: "Telugu" },
    { code: "mr-IN", name: "Marathi" },
    { code: "gu-IN", name: "Gujarati" },
    { code: "kn-IN", name: "Kannada" },
    { code: "ml-IN", name: "Malayalam" },
  ];

  const pulseVariants = {
    recording: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    idle: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-col items-center">
      {/* Language Selection */}
      <div className="mb-4 grid grid-cols-2 gap-4 w-full max-w-md">
        <div>
          <label className="block mb-1 text-sm font-medium text-neutral-700">
            Source Language
          </label>
          <select
            value={srcLang}
            onChange={(e) => setSrcLang(e.target.value)}
            className="block w-full px-4 py-2 text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isRecording}
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-neutral-700">
            Target Language
          </label>
          <select
            value={tgtLang}
            onChange={(e) => setTgtLang(e.target.value)}
            className="block w-full px-4 py-2 text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isRecording}
          >
            {languageOptions
              .filter((lang) => lang.code !== "auto")
              .map((lang) => (
                <option key={lang.code} value={lang.code.split("-")[0]}>
                  {lang.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Mic Button */}
      <motion.div
        variants={pulseVariants}
        animate={isRecording ? "recording" : "idle"}
        className={`relative rounded-full p-8 ${isRecording ? "bg-error-500" : "bg-primary-500"}`}
      >
        <button
          onClick={isRecording ? stopRecording : startRecognition}
          className="flex items-center justify-center p-4 rounded-full bg-white text-neutral-900 focus:outline-none transform transition-transform active:scale-95"
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? (
            <StopCircle size={48} className="text-error-500" />
          ) : (
            <Mic size={48} className="text-primary-500" />
          )}
        </button>
      </motion.div>

      <div className="mt-4 text-center">
        {isRecording ? (
          <>
            <p className="text-lg font-medium">
              Recording... {formatTime(recordingTime)}
            </p>
            <p className="text-sm text-neutral-500 mt-1">Tap the button to stop</p>
          </>
        ) : (
          <p className="text-neutral-600">Tap the microphone to start recording</p>
        )}
      </div>

      {(finalTranscript || interimTranscript) && (
        <div className="mt-6 px-4 text-center max-w-xl">
          <p className="text-base font-semibold mb-2">Live Transcript:</p>
          <p className="text-neutral-800">
            {finalTranscript}
            <span className="text-neutral-400 italic">{interimTranscript}</span>
          </p>

          {translatedText && (
            <>
              <p className="text-base font-semibold mt-4 mb-2">
                Translation ({tgtLang}):
              </p>
              <p className="text-neutral-700 italic">{translatedText}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
