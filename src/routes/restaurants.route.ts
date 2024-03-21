import express from 'express';

import { getRestaurantsController, getSingleRestaurant } from '@controllers/index';

const router = express.Router();

router.get('/', getRestaurantsController);
router.get('/:restaurantId', getSingleRestaurant);

export default router;
