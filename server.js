import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { DB_NAME, LOG_SETTING, NODE_ENV, PORT } from './config/VARS.js';
import apiRoutes from './routes/index.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { corsConfig } from './config/cors.js';
import { databaseSync } from './config/databaseSync.js';

NODE_ENV === 'development' ? console.log('🚀 App starting... 🚀') : null;

// const date = new Date().toString();
// console.log('🚀 ~ file: server.js ~ line 15 ~ date', date)
// const year = new Date().getFullYear()
// console.log('🚀 ~ file: server.js ~ line 15 ~ year', year, typeof year)
// const month = new Date().getMonth()
// console.log('🚀 ~ file: server.js ~ line 17 ~ month', month, typeof month)
// const day = new Date().getDate()
// console.log('🚀 ~ file: server.js ~ line 19 ~ day', day, typeof day)

const app = express();

app.use(cors(corsConfig));
app.use(morgan(LOG_SETTING));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use('/api', apiRoutes);

app.use(errorHandler);

await databaseSync();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (${NODE_ENV}). Connected to db: ${DB_NAME}`);
});
