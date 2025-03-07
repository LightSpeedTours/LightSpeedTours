// routes/userRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateSignin } from '../middlewares/authMiddleware';

const authController = new AuthController();

const router = Router();
// Login endpoint
router.post('/login', authController.login);  // registrarse
router.post('/signin', validateSignin, authController.signin)                        // logearse

export default router; 