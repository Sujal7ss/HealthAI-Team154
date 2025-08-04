import express from "express"
const router = express.Router();

let assessments = [];

router.get('/', (req, res) => res.json(assessments));

router.get('/:id', (req, res) => {
  const a = assessments.find(a => a.id === req.params.id);
  if (!a) return res.status(404).send('Not found');
  res.json(a);
});

router.post('/', (req, res) => {
  const newAssessment = { id: Date.now().toString(), ...req.body };
  assessments.push(newAssessment);
  res.status(201).json(newAssessment);
});

router.put('/:id', (req, res) => {
  const index = assessments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).send('Not found');

  assessments[index] = { ...assessments[index], ...req.body };
  res.json(assessments[index]);
});

export default router;
