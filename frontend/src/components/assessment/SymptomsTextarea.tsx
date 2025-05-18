import React from 'react';

interface SymptomsTextareaProps {
  value: string;
  onChange: (text: string) => void;
  isEditingRecording: boolean;
}

const SymptomsTextarea: React.FC<SymptomsTextareaProps> = ({ value, onChange, isEditingRecording }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-neutral-700 mb-2">
      {isEditingRecording ? 'Edit symptoms if needed:' : 'Enter symptoms:'}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-neutral-300 rounded-lg min-h-[150px] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="Describe the symptoms in detail..."
    />
  </div>
);

export default SymptomsTextarea;
