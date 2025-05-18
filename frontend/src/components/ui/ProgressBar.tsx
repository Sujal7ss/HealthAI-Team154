import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
}

const stepsLabels = ["Patient Info", "Symptoms", "Analysis", "Results"];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const progressPercentage = ((currentStep + 1) / stepsLabels.length) * 100;

  return (
    <>
      <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-4">
        <motion.div
          className="bg-primary-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between text-sm text-neutral-500">
        {stepsLabels.map((label, index) => (
          <span
            key={label}
            className={index === currentStep ? "font-medium text-primary-600" : ""}
          >
            {label}
          </span>
        ))}
      </div>
    </>
  );
};

export default ProgressBar;
