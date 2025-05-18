interface LiveTranscriptProps {
  liveTranscript: string;
  liveTranslation: string;
}

const LiveTranscript: React.FC<LiveTranscriptProps> = ({ liveTranscript, liveTranslation }) => (
  <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
    <h2 className="text-md font-semibold text-neutral-700 mb-1">🎙️ Live Transcript:</h2>
    <p className="text-sm text-neutral-800">{liveTranscript || "Listening..."}</p>

    <h2 className="text-md font-semibold text-neutral-700 mt-4 mb-1">🌐 Translated:</h2>
    <p className="text-sm text-neutral-800">{liveTranslation || "Translating..."}</p>
  </div>
);
export default LiveTranscript;
