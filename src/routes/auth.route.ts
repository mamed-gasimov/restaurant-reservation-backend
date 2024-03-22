import express from 'express';

import {
  getCurrentUserController,
  loginController,
  registerController,
  userAccessTokenController,
} from '@controllers/index';
import { validateSchema } from '@middlewares/validateSchema';
import { registerSchema } from '@validationSchemas/register';
import { loginSchema } from '@validationSchemas/login';
import { getAccessTokenSchema } from '@validationSchemas/accessToken';
import { authenticateToken } from '@middlewares/authenticateToken';

const router = express.Router();

router.post('/register', validateSchema(registerSchema), registerController);
router.post('/login', validateSchema(loginSchema), loginController);
router.post('/token', validateSchema(getAccessTokenSchema), userAccessTokenController);
router.get('/current', authenticateToken, getCurrentUserController);

export default router;
