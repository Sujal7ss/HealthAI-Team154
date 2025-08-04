import express from "express"
const router = express.Router();

let diagnostics = [];

router.get('/', (req, res) => res.json(diagnostics));

router.get('/:patientId', (req, res) => {
  const results = diagnostics.filter(d => d.patientId === req.params.patientId);
  res.json(results);
});

router.post('/analyze', (req, res) => {
  const { type, data } = req.body;
  res.json({
    riskScore: Math.floor(Math.random() * 100),
    observations: ["Normal QRS", "No ST abnormalities"],
    conclusion: "Normal result"
  });
});

export default router;
