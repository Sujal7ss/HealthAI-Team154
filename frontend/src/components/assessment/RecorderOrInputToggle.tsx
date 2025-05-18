import React from 'react';
import Button from '../ui/Button';

interface RecorderOrInputToggleProps {
  showTextInput: boolean;
  recordingResultPresent: boolean;
  onShowTextInput: () => void;
}

const RecorderOrInputToggle: React.FC<RecorderOrInputToggleProps> = ({
  showTextInput,
  recordingResultPresent,
  onShowTextInput,
}) => {
  if (!showTextInput && !recordingResultPresent) {
    return (
      <Button variant="outline" onClick={onShowTextInput}>
        Type symptoms instead
      </Button>
    );
  }
  return null;
};

export default RecorderOrInputToggle;
