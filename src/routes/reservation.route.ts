import express from 'express';

import {
  createReservationController,
  getReservationsController,
  updateReservationController,
} from '@controllers/index';
import { authenticateToken } from '@middlewares/authenticateToken';
import { validateSchema } from '@middlewares/validateSchema';
import { reservationSchema, updateReservationSchema } from '@validationSchemas/reservation';

const router = express.Router();

router.post('/', authenticateToken, validateSchema(reservationSchema), createReservationController);
router.put('/', authenticateToken, validateSchema(updateReservationSchema), updateReservationController);
router.get('/:restaurantId', authenticateToken, getReservationsController);

export default router;
