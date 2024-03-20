import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import { authRoutes } from '@routes/index';
import { errorHandler } from '@middlewares/errorHandler';

config();
const app = express();
const PORT = 3001;
const DB_URL = 'mongodb://localhost:27017/restaurant-reservation';

app.use(helmet());
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('Failed to connect to the database!');
      console.log(error);
    });
});
