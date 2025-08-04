import express from "express"
const router = express.Router();

router.post('/start', (req, res) => {
  res.send('Recording started');
});

router.post('/stop', (req, res) => {
  res.json({
    text: "I have had chest pain and dizziness for 3 days.",
    language: "english",
    confidence: 0.92,
  });
});

export default router;
