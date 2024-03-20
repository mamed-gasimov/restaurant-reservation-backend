import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { authRoutes } from '@routes/index';

const app = express();
const PORT = 3001;

app.use(helmet());
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
