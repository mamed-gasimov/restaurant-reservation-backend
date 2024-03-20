import express from 'express';

import { loginController, registerController } from '@controllers/index';
import { validateSchema } from '@middlewares/validateSchema';
import { registerSchema } from '@validationSchemas/register';
import { loginSchema } from '@validationSchemas/login';

const router = express.Router();

router.post('/register', validateSchema(registerSchema), registerController);
router.post('/login', validateSchema(loginSchema), loginController);

export default router;
