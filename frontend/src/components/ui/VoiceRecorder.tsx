import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle } from 'lucide-react';
import { VoiceRecognitionResult } from '../../types';
import { translateText } from '../../utils/reverieTranslate';

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
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const recognitionRef = useRef<any>(null);

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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = selectedLanguage === 'auto' ? 'en-US' : selectedLanguage;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    setFinalTranscript('');
    setInterimTranscript('');
    setTranslatedText('');

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }

      setInterimTranscript(interim);
      setFinalTranscript((prev) => prev + final);

      if (final.trim()) {
        // Trigger translation on final transcript
        const srcLang = recognition.lang.split('-')[0]; // e.g. 'hi-IN' -> 'hi'
        try {
          const translated = await translateText(final.trim(), srcLang, 'en'); // translate to English
          console.log('Translated:', translated);
          setTranslatedText((prev) => prev + translated + ' ');
        } catch (err) {
          console.error('Translation error:', err);
        }

        onRecordingComplete({
          text: final.trim(),
          confidence: 1,
          language: recognition.lang,
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimTranscript('');
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const languages = [
    { code: 'auto', name: 'Auto-detect' },  
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'bn-IN', name: 'Bengali' },
    { code: 'ta-IN', name: 'Tamil' },
    { code: 'te-IN', name: 'Telugu' },
    { code: 'mr-IN', name: 'Marathi' },
    { code: 'gu-IN', name: 'Gujarati' },
    { code: 'kn-IN', name: 'Kannada' },
    { code: 'ml-IN', name: 'Malayalam' },
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
        <div className="mt-6 px-4 text-center max-w-xl">
          <p className="text-base font-semibold mb-2">Live Transcript:</p>
          <p className="text-neutral-800">
            {finalTranscript}
            <span className="text-neutral-400 italic">{interimTranscript}</span>
          </p>

          {/* Show translated text */}
          {translatedText && (
            <>
              <p className="text-base font-semibold mt-4 mb-2">Translation (English):</p>
              <p className="text-neutral-700 italic">{translatedText}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
