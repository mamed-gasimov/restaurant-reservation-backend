import express from 'express';

import { getRestaurantsController } from '@controllers/index';

const router = express.Router();

router.get('/', getRestaurantsController);

export default router;
