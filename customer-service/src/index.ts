import express from 'express';
import cors from 'cors';
import reportDataRoutes from './routes/reportData';
import ConfigExpress from "./config/ConfigExpress";

const config = ConfigExpress.getConfiguration();
const app = express();
const PORT = config.PORT || 3005;

app.use(cors());
app.use(express.json());

app.use('/api', reportDataRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
