import { motion } from "framer-motion";
import { Mic, StopCircle } from "lucide-react";

const pulseVariants = {
  recording: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  idle: { scale: 1, opacity: 1 },
};

interface Props {
  isRecording: boolean;
  toggleRecording: () => void;
}

const MicButton: React.FC<Props> = ({ isRecording, toggleRecording }) => (
  <motion.div
    variants={pulseVariants}
    animate={isRecording ? "recording" : "idle"}
    className={`relative rounded-full p-8 ${isRecording ? "bg-error-500" : "bg-primary-500"}`}
  >
    <button
      onClick={toggleRecording}
      className="flex items-center justify-center p-4 rounded-full bg-white text-neutral-900"
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      {isRecording ? <StopCircle size={48} className="text-error-500" /> : <Mic size={48} className="text-primary-500" />}
    </button>
  </motion.div>
);

export default MicButton;
