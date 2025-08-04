import express from "express"
const router = express.Router();

router.post('/analyze-symptoms', async (req, res) => {
  const { symptoms } = req.body;

  // Simulate GPT results
  res.json({
    symptoms: ["Headache", "Nausea"],
    possibleCauses: ["Migraine", "Tension headache"],
    suggestedTests: ["MRI", "Blood test"],
    treatmentSuggestions: ["Hydration", "Paracetamol"]
  });
});

export default router;
