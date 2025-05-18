# 🧠 HealthAI-Team154

**Team Vikarna** | NIT Raipur

An AI-powered diagnostic assistant designed to enhance rural healthcare by addressing language barriers, inconsistent records, and limited diagnostic tools.

---

## 🚑 Problem Statement

Rural healthcare in India faces significant challenges:

- **Language Barriers**: Diverse languages hinder accurate assessments.
- **Inconsistent Records**: Manual paperwork leads to incomplete patient histories.
- **Limited Diagnostic Tools**: Lack of advanced equipment and specialists delays diagnoses.

---

## 💡 Our Solution

An AI-driven platform that assists doctors through:

1. **Conversation-to-Assessment Assistant**:
   - Records doctor-patient interactions in any language.
   - Translates speech to English using advanced NLP models.
   - Extracts symptoms, suggests diagnoses, and highlights red flags via LLMs.
   - Presents a concise, visual dashboard of the case assessment.

2. **Diagnostic Interpretation Assistant**:
   - Interprets data from diagnostic devices (e.g., ECGs, X-rays).
   - Uses pre-trained models to identify abnormalities.
   - Empowers general physicians with informed decision-making tools.

---

   ### 💰 Business Model
   
1. **B2B SaaS**: Offer subscription-based access to hospitals and clinics, providing scalable AI diagnostics and multilingual assistance.

2. **Freemium Model**: Provide essential features for free to encourage adoption, with premium diagnostics and advanced analytics available through paid tiers.

3. **API Licensing**: License our AI diagnostic APIs to medical device manufacturers, enabling integration into their products and expanding our reach.

4. **Data Analytics Services**: Offer anonymized health data insights to researchers and public health agencies, ensuring compliance with data privacy regulations.

5. **Training & Certification**: Provide online training modules and certification programs for healthcare professionals to ensure effective use of our platform.

---

## 📁 File Structure
```
HealthAI-Team154/
├── backend/
│ ├── fastapi/ # Python backend for clinical NLP and ML models
│ └── node-backend/ # Node.js backend for user authentication and session management
├── ecgbackend/ # Backend for ECG data processing
├── frontend/ # React-based responsive frontend
├── .gitignore
├── README.md
```

---

## 🚀 How to Run the Project

### 🧩 Prerequisites

Ensure you have the following installed on your system:

- **Python**: Version 3.9 or higher
- **Node.js**: Version 18 or higher
- **npm** or **yarn**
- **virtualenv** (for Python environments)
- **Git** (to clone the repository)
- **GPU** (recommended for running models like Whisper and LLMs)
  
  ### 📥 Step 1: Clone the Repository

Open your terminal and execute:

```bash
git clone https://github.com/Sujal7ss/HealthAI-Team154.git
cd HealthAI-Team154
```

  ### 🔧 Step 2: Set Up the Backend
  
a. FastAPI (Python Backend)

```bash
cd backend/fastapi
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

This will start the FastAPI server on http://127.0.0.1:8000.

b. Node.js Backend

```bash
cd ../node-backend
npm install
node index.js
```

This will start the Node.js server on the default port (usually http://localhost:3001).

  ### 💻 Step 3: Set Up the Frontend

```bash
cd ../../frontend
npm install
npm start
```

This will start the React frontend on http://localhost:3000.

  ### ✅ Step 4: Access the Application

Open your browser and navigate to http://localhost:3000 to interact with the HealthAI application.

---

## 🛠️ Tech Stack

| Layer            | Tools Used                                        |
|------------------|--------------------------------------------------|
| **Frontend**     | React.js, Tailwind CSS                           |
| **Backend**      | FastAPI (Python), Node.js                        |
| **Speech & NLP** | Whisper, Google Speech-to-Text, NLLB             |
| **LLM Analysis** | GPT-4, LLaMA (fine-tuned on medical data)        |
| **Diagnostics**  | CNN Models (ECG, X-rays e.g., CheXNet)           |
| **Storage**      | HIPAA-compliant local/cloud storage              |

---

## 🧬 Model Architecture Overview

Our system integrates multiple AI models to enhance diagnostic accuracy and efficiency:

### 1. **Speech Recognition & Translation**
- **Whisper**: Transcribes multilingual doctor-patient conversations into text.
- **NLLB (No Language Left Behind)**: Translates transcriptions into English, ensuring language inclusivity.

### 2. **Clinical NLP & Assessment**
- **GPT-4 / LLaMA (fine-tuned)**: Processes translated conversations to extract symptoms, suggest possible diagnoses, and highlight critical red flags.

### 3. **Diagnostic Image & Signal Interpretation**
- **CheXNet**: Analyzes chest X-rays to detect potential abnormalities.
- **Custom CNN Models**: Processes ECG data to identify irregularities and assist in cardiac assessments.

These models collectively provide a comprehensive diagnostic overview, aiding physicians in making informed decisions.

---

## 📊 Impact and Use Cases

- **General Physicians** in under-resourced areas.
- **Mobile Health Clinics** and NGO healthcare providers.
- **Public Health Missions** like Ayushman Bharat and NHM.

---

## 👨‍💻 Team Vikarna

| Name                  | Branch               | Institute       |
|-----------------------|----------------------|-----------------|
| Sujal Chahande        | Computer Science     | NIT Raipur      |
| Anshul Satone         | Computer Science     | NIT Raipur      |
| Mayank Sahu           | Electrical Engineering| NIT Raipur     |
| Ujjwal Agrawal        | Information Technology| NIT Raipur     |
| Shivajay Saxena       | Computer Science     | NIT Raipur      |
| MD Gulam Gaush Ansari | Computer Science     | NIT Raipur      |

---

## 📎 References

- [ChatGPT for Discharge Summaries - J Korean Med Sci. 2024](https://doi.org/10.3346/jkms.2024.39.e148)
- [MedRxiv: Bridging Rural Health Gap](https://www.medrxiv.org/content/10.1101/2024.07.30.24311228v1)

