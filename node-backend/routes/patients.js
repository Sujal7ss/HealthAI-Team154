import express from "express"
const router = express.Router();

let patients = [
  { id: '1', name: 'Maria Garcia', age: 45, gender: 'female' },
  { id: '2', name: 'John Smith', age: 67, gender: 'male' },
];

router.get('/', (req, res) => res.json(patients));

router.get('/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) return res.status(404).send('Not found');
  res.json(patient);
});

router.post('/', (req, res) => {
  const newPatient = { id: Date.now().toString(), ...req.body };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

export default router;
