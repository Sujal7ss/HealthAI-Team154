import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle } from 'lucide-react';
import { VoiceRecognitionResult } from '../../types';

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
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    let interval: number | undefined;

    if (isRecording) {
      interval = setInterval(() => {
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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = selectedLanguage === 'auto' ? 'en-US' : selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;

      onRecordingComplete({
        text: transcript,
        confidence,
        language: recognition.lang,
      });
    };

    recognition.onerror = (event: any) => {
      console.error('Recognition error:', event.error);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const languages = [
    { code: 'auto', name: 'Auto-detect' },
    { code: 'en-US', name: 'English' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'ar-SA', name: 'Arabic' },
  ];

  const pulseVariants = {
    recording: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    idle: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="block w-full px-4 py-2 text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          disabled={isRecording}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        variants={pulseVariants}
        animate={isRecording ? 'recording' : 'idle'}
        className={`relative rounded-full p-8 ${
          isRecording ? 'bg-error-500' : 'bg-primary-500'
        }`}
      >
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="flex items-center justify-center p-4 rounded-full bg-white text-neutral-900 focus:outline-none transform transition-transform active:scale-95"
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          {isRecording ? (
            <StopCircle size={48} className="text-error-500" />
          ) : (
            <Mic size={48} className="text-primary-500" />
          )}
        </button>
      </motion.div>

      {isRecording ? (
        <div className="mt-4 text-center">
          <p className="text-lg font-medium">Recording... {formatTime(recordingTime)}</p>
          <p className="text-sm text-neutral-500 mt-1">Tap the button to stop</p>
        </div>
      ) : (
        <p className="mt-4 text-center text-neutral-600">
          Tap the microphone to start recording
        </p>
      )}
    </div>
  );
};

export default VoiceRecorder;
