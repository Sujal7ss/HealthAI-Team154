import {
  Assessment,
  DiagnosticResult,
  Patient,
  User,
  VoiceRecognitionResult,
} from "../types";
import { assessmentResult } from "../components/assessment/deepseek";
// Mock delay function to simulate API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "doctor",
    avatar:
      "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    role: "doctor",
    avatar:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

// Mock patients data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Maria Garcia",
    age: 45,
    gender: "female",
  },
  {
    id: "2",
    name: "John Smith",
    age: 67,
    gender: "male",
  },
  {
    id: "3",
    name: "Aisha Patel",
    age: 32,
    gender: "female",
  },
];

// Mock assessments data
const mockAssessments: Assessment[] = [
  {
    id: "1",
    patientId: "1",
    doctorId: "1",
    date: "2025-04-10T14:30:00Z",
    symptoms: ["Persistent cough", "Fatigue", "Low-grade fever"],
    possibleCauses: [
      "Upper respiratory infection",
      "Mild pneumonia",
      "Bronchitis",
    ],
    suggestedTests: ["Chest X-ray", "Blood culture", "Sputum analysis"],
    treatmentSuggestions: [
      "Antibiotics if bacterial",
      "Rest",
      "Increased fluid intake",
    ],
    notes: "Patient reports symptoms began approximately 1 week ago.",
  },
  {
    id: "2",
    patientId: "2",
    doctorId: "1",
    date: "2025-04-08T10:15:00Z",
    symptoms: ["Chest pain", "Shortness of breath", "Dizziness"],
    possibleCauses: ["Angina", "Myocardial infarction", "Anxiety attack"],
    suggestedTests: ["ECG", "Cardiac enzymes", "Stress test"],
    treatmentSuggestions: [
      "Nitroglycerin as needed",
      "Follow-up with cardiologist",
    ],
    notes: "Patient has history of hypertension.",
  },
];

// Mock diagnostic results data
const mockDiagnosticResults: DiagnosticResult[] = [
  {
    id: "1",
    patientId: "2",
    type: "ecg",
    date: "2025-04-08T11:30:00Z",
    data: {
      values: [
        0.1, 0.13, 0.15, 0.2, 0.5, 1.2, 1.1, 0.8, 0.4, 0.2, 0.15, 0.1, 0.08,
        0.05, 0.02, 0, -0.02, -0.05, -0.04, -0.02, 0, 0.02, 0.05, 0.08, 0.1,
        0.12, 0.15, 0.2, 0.5, 1.2, 1.1, 0.8, 0.4, 0.2, 0.15, 0.1, 0.08, 0.05,
        0.02, 0, -0.02, -0.05, -0.04, -0.02, 0,
      ],
    },
    analysis: {
      riskScore: 65,
      observations: ["ST-segment depression", "T-wave inversion"],
      conclusion: "Findings consistent with myocardial ischemia.",
    },
  },
];

// Mock authentication API
export const mockAuth = {
  login: async (email: string, password: string): Promise<User | null> => {
    await delay(1000);
    if (email === "doctor@example.com" && password === "password") {
      return mockUsers[0];
    }
    return null;
  },
  getCurrentUser: async (): Promise<User | null> => {
    await delay(500);
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  },
  logout: async (): Promise<void> => {
    await delay(500);
    localStorage.removeItem("currentUser");
  },
};

// Mock patients API
export const mockPatientsApi = {
  getPatients: async (): Promise<Patient[]> => {
    await delay(800);
    return mockPatients;
  },
  getPatientById: async (id: string): Promise<Patient | null> => {
    await delay(500);
    const patient = mockPatients.find((p) => p.id === id);
    return patient || null;
  },
  createPatient: async (patient: Omit<Patient, "id">): Promise<Patient> => {
    await delay(1000);
    const newPatient = {
      ...patient,
      id: `${mockPatients.length + 1}`,
    };
    mockPatients.push(newPatient);
    return newPatient;
  },
};

// Mock assessments API
export const mockAssessmentsApi = {
  getAssessments: async (): Promise<Assessment[]> => {
    await delay(800);
    return mockAssessments;
  },
  getAssessmentsByPatientId: async (
    patientId: string
  ): Promise<Assessment[]> => {
    await delay(600);
    return mockAssessments.filter((a) => a.patientId === patientId);
  },
  getAssessmentById: async (id: string): Promise<Assessment | null> => {
    await delay(500);
    const assessment = mockAssessments.find((a) => a.id === id);
    return assessment || null;
  },
  createAssessment: async (
    assessment: Omit<Assessment, "id">
  ): Promise<Assessment> => {
    await delay(1200);
    const newAssessment = {
      ...assessment,
      id: `${mockAssessments.length + 1}`,
    };
    mockAssessments.push(newAssessment);
    return newAssessment;
  },
  updateAssessment: async (
    id: string,
    updates: Partial<Assessment>
  ): Promise<Assessment | null> => {
    await delay(1000);
    const index = mockAssessments.findIndex((a) => a.id === id);
    if (index === -1) return null;

    mockAssessments[index] = { ...mockAssessments[index], ...updates };
    return mockAssessments[index];
  },
};

// Mock diagnostics API
export const mockDiagnosticsApi = {
  getDiagnosticResults: async (): Promise<DiagnosticResult[]> => {
    await delay(800);
    return mockDiagnosticResults;
  },
  getDiagnosticResultsByPatientId: async (
    patientId: string
  ): Promise<DiagnosticResult[]> => {
    await delay(600);
    return mockDiagnosticResults.filter((d) => d.patientId === patientId);
  },
  analyzeDiagnosticData: async (
    type: "ecg" | "x-ray" | "ct-scan",
    data: any
  ): Promise<{
    riskScore: number;
    observations: string[];
    conclusion: string;
  }> => {
    await delay(2000);
    // Mock analysis results based on type
    if (type === "ecg") {
      return {
        riskScore: Math.floor(Math.random() * 100),
        observations: [
          "Regular rhythm",
          "Normal QRS complex",
          "No ST-segment abnormalities",
        ],
        conclusion:
          "Normal ECG findings. No evidence of acute cardiac pathology.",
      };
    }
    return {
      riskScore: Math.floor(Math.random() * 100),
      observations: ["Normal findings", "No abnormalities detected"],
      conclusion: "Normal diagnostic results.",
    };
  },
};

// Mock voice recognition API
export const mockVoiceRecognition = {
  startRecording: async (): Promise<void> => {
    await delay(100);
    console.log("Recording started...");
  },
  stopRecording: async (): Promise<VoiceRecognitionResult> => {
    await delay(2000);
    return {
      text: "I have been experiencing headaches and dizziness for the past three days. The pain is mostly on the right side of my head and gets worse when I stand up quickly.",
      language: "english",
      confidence: 0.92,
    };
  },
  detectLanguage: async (text: string): Promise<string> => {
    await delay(500);
    // Mock language detection
    const languages = ["english", "spanish", "french", "hindi", "arabic"];
    return languages[Math.floor(Math.random() * languages.length)];
  },
};

import { AnalysisResultType } from "../types/index";
// Mock GPT medical assessment API
export const mockGptMedicalAssessment = {
  analyzeSymptoms: async (
    symptoms: string
  ): Promise<AnalysisResultType> => {
    // Mock GPT response
    const response = await assessmentResult({ text: symptoms });
    if (response) {
      return {
        symptoms: response.Key_Symptoms_Findings,
        possibleCauses: response.Possible_Causes,
        suggestedTests: response.Suggested_Tests,
        treatmentSuggestions: response.Suggested_Treatment,
      };
    }

    // Default response
    return {
      symptoms: [
        "Chest pain or tightness",
        "Pain triggered by physical exertion",
        "Pain relieved by rest",
        "Increasing frequency of chest pain",
        "Shortness of breath on exertion",
      ],
      possibleCauses: [
        "Stable angina",
        "Unstable angina",
        "Myocardial infarction",
        "Gastroesophageal reflux disease (GERD)",
        "Anxiety-related chest pain",
      ],
      suggestedTests: [
        "Electrocardiogram (ECG)",
        "Cardiac troponin test",
        "Lipid profile",
        "Exercise stress test",
        "Chest X-ray",
      ],
      treatmentSuggestions: [
        "Sublingual nitroglycerin for pain relief",
        "Beta-blockers or calcium channel blockers",
        "Lifestyle modifications (smoking cessation, diet, exercise)",
        "Cardiology referral",
        "Emergency evaluation if pain occurs at rest or worsens",
      ],
    };
  },
};

// Mock local storage functions
export const mockStorage = {
  saveAssessment: (assessment: Assessment): void => {
    const savedAssessments = localStorage.getItem("assessments");
    const assessments = savedAssessments ? JSON.parse(savedAssessments) : [];
    assessments.push(assessment);
    localStorage.setItem("assessments", JSON.stringify(assessments));
  },
  getSavedAssessments: (): Assessment[] => {
    const savedAssessments = localStorage.getItem("assessments");
    return savedAssessments ? JSON.parse(savedAssessments) : [];
  },
};
