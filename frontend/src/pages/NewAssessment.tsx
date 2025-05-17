import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assessment, Patient, VoiceRecognitionResult } from "../types";
import PatientForm from "../components/patient/PatientForm";
import SymptomsInput from "../components/assessment/SymptomsInput";
import AnalysisResult from "../components/assessment/AnalysisResult";
import Loader from "../components/ui/Loader";
import { motion } from "framer-motion";
import {
  mockGptMedicalAssessment,
  mockAssessmentsApi,
  mockPatientsApi,
} from "../utils/mockApi";
import { useAuth } from "../context/AuthContext";
// import socket from "../socket";

enum AssessmentStep {
  PATIENT_INFO = "PATIENT_INFO",
  SYMPTOMS_INPUT = "SYMPTOMS_INPUT",
  ANALYZING = "ANALYZING",
  RESULTS = "RESULTS",
}

const NewAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>(
    AssessmentStep.PATIENT_INFO
  );
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
  // useEffect(() => {
  //   if (currentStep === AssessmentStep.SYMPTOMS_INPUT) {
  //     socket.connect();

  //     socket.on(
  //       "transcription_result",
  //       (data: { original: string; translated: string }) => {
  //         setLiveTranscript(data.original);
  //         setLiveTranslation(data.translated);
  //       }
  //     );

  //     return () => {
  //       socket.off("transcription_result");
  //       socket.disconnect();
  //     };
  //   }
  // }, [currentStep]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePatientSubmit = async (patientData: Omit<Patient, "id">) => {
    setPatient(patientData);
    const newPatient = await mockPatientsApi.createPatient(patientData);
    setPatientId(newPatient.id);
    setCurrentStep(AssessmentStep.SYMPTOMS_INPUT);
  };

  const handleSymptomsSubmit = async (
    symptoms: string,
    detectedLanguage: string
  ) => {
    setSymptomsText(symptoms);
    setLanguage(detectedLanguage);
    setCurrentStep(AssessmentStep.ANALYZING);

    try {
      const results = await mockGptMedicalAssessment.analyzeSymptoms(symptoms);
      setAnalysisResults(results);
      setCurrentStep(AssessmentStep.RESULTS);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      // Handle error
    }
  };

  const handleAnalysisEdit = (updatedResults: {
    symptoms: string[];
    possibleCauses: string[];
    suggestedTests: string[];
    treatmentSuggestions: string[];
  }) => {
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

  const renderStep = () => {
    switch (currentStep) {
      case AssessmentStep.PATIENT_INFO:
        return <PatientForm onSubmit={handlePatientSubmit} />;

      case AssessmentStep.SYMPTOMS_INPUT:
        return (
          <div>
            <SymptomsInput onNext={handleSymptomsSubmit} />

            <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h2 className="text-md font-semibold text-neutral-700 mb-1">
                🎙️ Live Transcript:
              </h2>
              <p className="text-sm text-neutral-800">
                {liveTranscript || "Listening..."}
              </p>

              <h2 className="text-md font-semibold text-neutral-700 mt-4 mb-1">
                🌐 Translated:
              </h2>
              <p className="text-sm text-neutral-800">
                {liveTranslation || "Translating..."}
              </p>
            </div>
          </div>
        );

      case AssessmentStep.ANALYZING:
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader size="lg" text="Analyzing symptoms..." />
            <p className="mt-6 text-neutral-600 max-w-md text-center">
              Our AI is analyzing the symptoms and generating a medical
              assessment. This may take a moment...
            </p>
          </div>
        );

      case AssessmentStep.RESULTS:
        return analysisResults ? (
          <AnalysisResult
            symptoms={analysisResults.symptoms}
            possibleCauses={analysisResults.possibleCauses}
            suggestedTests={analysisResults.suggestedTests}
            treatmentSuggestions={analysisResults.treatmentSuggestions}
            onSave={handleAnalysisEdit}
            onContinue={saveAndContinue}
          />
        ) : null;

      default:
        return null;
    }
  };

  // Progress bar percentage
  const progressPercentage = (() => {
    switch (currentStep) {
      case AssessmentStep.PATIENT_INFO:
        return 25;
      case AssessmentStep.SYMPTOMS_INPUT:
        return 50;
      case AssessmentStep.ANALYZING:
        return 75;
      case AssessmentStep.RESULTS:
        return 100;
      default:
        return 0;
    }
  })();

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">
          New Patient Assessment
        </h1>
        <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-4">
          <motion.div
            className="bg-primary-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-sm text-neutral-500">
          <span
            className={
              currentStep === AssessmentStep.PATIENT_INFO
                ? "font-medium text-primary-600"
                : ""
            }
          >
            Patient Info
          </span>
          <span
            className={
              currentStep === AssessmentStep.SYMPTOMS_INPUT
                ? "font-medium text-primary-600"
                : ""
            }
          >
            Symptoms
          </span>
          <span
            className={
              currentStep === AssessmentStep.ANALYZING
                ? "font-medium text-primary-600"
                : ""
            }
          >
            Analysis
          </span>
          <span
            className={
              currentStep === AssessmentStep.RESULTS
                ? "font-medium text-primary-600"
                : ""
            }
          >
            Results
          </span>
        </div>
      </div>

      <div className="bg-white rounded-card shadow-sm p-6">{renderStep()}</div>
    </div>
  );
};

export default NewAssessment;
