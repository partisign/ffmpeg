import express from 'express';
import router from './router/index.js';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(router);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
