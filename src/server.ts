import compression from 'compression';
import express from 'express';
import dotenv from 'dotenv';
import AppDatabase from './database/app-database';
import authMiddleware from './middlewares/auth-middleware';

import { authRouter } from './routes/auth.routes';
import { assetsRouter } from './routes/assets.routes';
import { stockRouter } from './routes/stock.routes';

const app = express();
dotenv.config();

app.disable('x-powered-by'); // disable x-powered-by express response header
app.use(compression()); // middleware to compress gzip
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRouter);

// app.use(authMiddleware);
app.use('/assets', assetsRouter);
app.use('/stock', stockRouter);

app.use((req, res) => {
  return res.status(404).sendFile(`${__dirname}/routes/404/404.html`);
});

const db = new AppDatabase();

db.connect().then(() => {
  app.listen(process.env.SERVER_PORT || 7070, () =>
    console.log('✅ Server started and database connected!')
  );
});
