import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reportDataRoutes from './routes/reportData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api', reportDataRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
