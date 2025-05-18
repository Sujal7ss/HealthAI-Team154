import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Assessment,
  Patient,
} from "../types";
import PatientForm from "../components/patient/PatientForm";
import SymptomsInput from "../components/assessment/SymptomsInput";
import AnalysisResult from "../components/assessment/AnalysisResult";
import Loader from "../components/ui/Loader";
import ProgressBar from "../components/ui/ProgressBar";
import LiveTranscript from "../components/ui/LiveTranscript ";
import { mockGptMedicalAssessment, mockAssessmentsApi, mockPatientsApi } from "../utils/mockApi";
import { useAuth } from "../context/AuthContext";

enum AssessmentStep {
  PATIENT_INFO = 0,
  SYMPTOMS_INPUT = 1,
  ANALYZING = 2,
  RESULTS = 3,
}

const NewAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>(AssessmentStep.PATIENT_INFO);
  const [patient, setPatient] = useState<Omit<Patient, "id">>();
  const [patientId, setPatientId] = useState<string>("");
  const [symptomsText, setSymptomsText] = useState<string>("");
  const [language, setLanguage] = useState<string>("english");
  const [analysisResults, setAnalysisResults] = useState<{
    symptoms: string[];
    possibleCauses: string[];
    suggestedTests: string[];
    treatmentSuggestions: string[];
  } | null>(null);

  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [liveTranslation, setLiveTranslation] = useState<string>("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePatientSubmit = async (patientData: Omit<Patient, "id">) => {
    setPatient(patientData);
    const newPatient = await mockPatientsApi.createPatient(patientData);
    setPatientId(newPatient.id);
    setCurrentStep(AssessmentStep.SYMPTOMS_INPUT);
  };

  const handleSymptomsSubmit = async (symptoms: string, detectedLanguage: string) => {
    setSymptomsText(symptoms);
    setLanguage(detectedLanguage);
    setCurrentStep(AssessmentStep.ANALYZING);

    try {
      const results = await mockGptMedicalAssessment.analyzeSymptoms(symptoms);
      setAnalysisResults(results);
      setCurrentStep(AssessmentStep.RESULTS);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
    }
  };

  const handleAnalysisEdit = (updatedResults: typeof analysisResults) => {
    setAnalysisResults(updatedResults);
  };

  const saveAndContinue = async () => {
    if (!user || !patientId || !analysisResults) return;

    const assessment: Omit<Assessment, "id"> = {
      patientId,
      doctorId: user.id,
      date: new Date().toISOString(),
      symptoms: analysisResults.symptoms,
      possibleCauses: analysisResults.possibleCauses,
      suggestedTests: analysisResults.suggestedTests,
      treatmentSuggestions: analysisResults.treatmentSuggestions,
      notes: `Original symptoms recorded in ${language}: ${symptomsText}`,
    };

    await mockAssessmentsApi.createAssessment(assessment);
    navigate("/diagnostics");
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">New Patient Assessment</h1>
        <ProgressBar currentStep={currentStep} />
      </div>

      <div className="bg-white rounded-card shadow-sm p-6">
        {currentStep === AssessmentStep.PATIENT_INFO && (
          <PatientForm onSubmit={handlePatientSubmit} />
        )}

        {currentStep === AssessmentStep.SYMPTOMS_INPUT && (
          <>
            <SymptomsInput onNext={handleSymptomsSubmit} />
            {/* <LiveTranscript liveTranscript={liveTranscript} liveTranslation={liveTranslation} /> */}
          </>
        )}

        {currentStep === AssessmentStep.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader size="lg" text="Analyzing symptoms..." />
            <p className="mt-6 text-neutral-600 max-w-md text-center">
              Our AI is analyzing the symptoms and generating a medical assessment. This may take a moment...
            </p>
          </div>
        )}

        {currentStep === AssessmentStep.RESULTS && analysisResults && (
          <AnalysisResult
            symptoms={analysisResults.symptoms}
            possibleCauses={analysisResults.possibleCauses}
            suggestedTests={analysisResults.suggestedTests}
            treatmentSuggestions={analysisResults.treatmentSuggestions}
            onSave={handleAnalysisEdit}
            onContinue={saveAndContinue}
          />
        )}
      </div>
    </div>
  );
};

export default NewAssessment;
