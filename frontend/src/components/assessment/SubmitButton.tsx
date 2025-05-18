import React from 'react';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface SubmitButtonProps {
  enabled: boolean;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ enabled, onClick }) => (
  <Button onClick={onClick} disabled={!enabled} rightIcon={<ArrowRight size={18} />}>
    Continue to Analysis
  </Button>
);

export default SubmitButton;
