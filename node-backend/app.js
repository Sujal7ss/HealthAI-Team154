import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import patientsRoutes from './routes/patients.js';
import assessmentsRoutes from './routes/assessments.js';
import diagnosticsRoutes from './routes/diagnostics.js';
import gptRoutes from './routes/gpt.js';
import voiceRoutes from './routes/voice.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/diagnostics', diagnosticsRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/voice', voiceRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();

});
