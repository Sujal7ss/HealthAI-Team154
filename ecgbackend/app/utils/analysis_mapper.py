def get_analysis(predicted_class: str):
    risk_map = {
        "Normal": 10,
        "Premature Atrial Contraction": 45,
        "Right Bundle Branch Block": 50,
        "Premature Ventricular Contractions": 75,
        "Left Bundle Branch Block": 80,
        "Ventricular Fibrillation": 95
    }

    observations_map = {
        "Normal": ["No abnormalities detected.", "Stable heartbeat."],
        "Premature Atrial Contraction": ["Irregular early beats from atria.", "Potential mild arrhythmia."],
        "Premature Ventricular Contractions": ["Extra heartbeats originating from ventricles.", "Monitor for frequency."],
        "Left Bundle Branch Block": ["Delayed signal in left ventricle.", "May indicate underlying heart disease."],
        "Right Bundle Branch Block": ["Signal delay in right ventricle.", "Could be benign or signal pulmonary condition."],
        "Ventricular Fibrillation": ["Chaotic electrical activity.", "Requires immediate attention."]
    }

    conclusions_map = {
        "Normal": "ECG shows normal rhythm with no signs of arrhythmia.",
        "Premature Atrial Contraction": "PACs observed. Usually benign but monitor if frequent.",
        "Premature Ventricular Contractions": "PVCs present. Could be benign or related to underlying issues.",
        "Left Bundle Branch Block": "LBBB detected. Further evaluation may be necessary.",
        "Right Bundle Branch Block": "RBBB observed. May not require treatment if asymptomatic.",
        "Ventricular Fibrillation": "V-Fib detected. Medical emergency — consult cardiologist immediately."
    }

    return {
        "riskScore": risk_map.get(predicted_class, "Unknown"),
        "observations": observations_map.get(predicted_class, []),
        "conclusion": conclusions_map.get(predicted_class, "No conclusion available.")
    }
