// routes/userRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authController = new AuthController();

const router = Router();
// Login endpoint
router.post('/login', authController.login);  // registrarse
router.post('/signin')                        // logearse

export default router; 