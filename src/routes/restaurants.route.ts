import express from 'express';

import { getRestaurantsController } from '@controllers/index';
import { authenticateToken } from '@middlewares/authenticateToken';

const router = express.Router();

router.get('/', authenticateToken, getRestaurantsController);

export default router;
