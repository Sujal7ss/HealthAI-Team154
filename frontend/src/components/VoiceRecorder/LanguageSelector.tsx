interface Props {
  srcLang: string;
  tgtLang: string;
  setSrcLang: (val: string) => void;
  setTgtLang: (val: string) => void;
  isRecording: boolean;
}

const languageOptions = [
  { code: "en", name: "English" },
  { code: "hi-IN", name: "Hindi" },
  { code: "bn-IN", name: "Bengali" },
  { code: "ta-IN", name: "Tamil" },
  { code: "te-IN", name: "Telugu" },
  { code: "mr-IN", name: "Marathi" },
  { code: "gu-IN", name: "Gujarati" },
  { code: "kn-IN", name: "Kannada" },
  { code: "ml-IN", name: "Malayalam" },
  { code: "ur", name: "Urdu" },
  	
];

const LanguageSelector: React.FC<Props> = ({ srcLang, tgtLang, setSrcLang, setTgtLang, isRecording }) => (
  <div className="mb-4 grid grid-cols-2 gap-4 w-full max-w-md">
    <div>
      <label className="block mb-1 text-sm font-medium text-neutral-700">Source Language</label>
      <select
        value={srcLang}
        onChange={(e) => setSrcLang(e.target.value)}
        disabled={isRecording}
        className="block w-full px-4 py-2 border rounded-lg"
      >
        {languageOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block mb-1 text-sm font-medium text-neutral-700">Target Language</label>
      <select
        value={tgtLang}
        onChange={(e) => setTgtLang(e.target.value)}
        disabled={isRecording}
        className="block w-full px-4 py-2 border rounded-lg"
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
);

export default LanguageSelector;
