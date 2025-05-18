import React, { useState } from "react";
import { useVoiceRecognition } from "./useVoiceRecognition";
import LanguageSelector from "./LanguageSelector";
import MicButton from "./MicButton";
import TranscriptDisplay from "./TranscriptDisplay";
import { VoiceRecognitionResult } from "../../types";

interface VoiceRecorderProps {
  onRecordingComplete: (result: VoiceRecognitionResult) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  // Hooks are always called unconditionally here
  const [srcLang, setSrcLang] = useState("auto");
  const [tgtLang, setTgtLang] = useState("en");

  const {
    isRecording,
    recordingTime,
    interimTranscript,
    interimTranslated,
    finalTranscript,
    translatedText,
    startRecognition,
    stopRecognition,
  } = useVoiceRecognition(srcLang, tgtLang, onRecordingComplete);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center">
      <LanguageSelector
        srcLang={srcLang}
        tgtLang={tgtLang}
        setSrcLang={setSrcLang}
        setTgtLang={setTgtLang}
        isRecording={isRecording}
      />

      <MicButton isRecording={isRecording} toggleRecording={toggleRecording} />

      <div className="mt-4 text-center">
        {isRecording ? (
          <>
            <p className="text-lg font-medium">Recording... {formatTime(recordingTime)}</p>
            <p className="text-sm text-neutral-500 mt-1">Tap the button to stop</p>
          </>
        ) : (
          <p className="text-neutral-600">Tap the microphone to start recording</p>
        )}
      </div>

      {(finalTranscript || interimTranscript) && (
        <TranscriptDisplay
          finalTranscript={finalTranscript}
          interimTranscript={interimTranscript}
          interimTranslated={interimTranslated}
          translatedText={translatedText}
          tgtLang={tgtLang}
        />
      )}
    </div>
  );
};

export default VoiceRecorder;
