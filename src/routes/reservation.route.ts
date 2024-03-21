import express from 'express';

import { createReservationController } from '@controllers/index';
import { authenticateToken } from '@middlewares/authenticateToken';
import { validateSchema } from '@middlewares/validateSchema';
import { reservationSchema } from '@validationSchemas/reservation';

const router = express.Router();

router.post('/', authenticateToken, validateSchema(reservationSchema), createReservationController);
router.put('/:reservationId');

export default router;
