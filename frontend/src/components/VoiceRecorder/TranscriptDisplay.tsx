interface Props {
  finalTranscript: string;
  interimTranscript: string;
  translatedText: string;
  tgtLang: string;
}

const TranscriptDisplay: React.FC<Props> = ({ finalTranscript, interimTranscript, translatedText, tgtLang }) => (
  <div className="mt-6 px-4 text-center max-w-xl">
    <p className="text-base font-semibold mb-2">Live Transcript:</p>
    <p className="text-neutral-800">
      {finalTranscript}
      <span className="text-neutral-400 italic">{interimTranscript}</span>
    </p>

    {translatedText && (
      <>
        <p className="text-base font-semibold mt-4 mb-2">Translation ({tgtLang}):</p>
        <p className="text-neutral-700 italic">{translatedText}</p>
      </>
    )}
  </div>
);

export default TranscriptDisplay;
