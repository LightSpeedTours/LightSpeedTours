// controllers/AuthController.ts
import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { handleErrorResponse, makeErrorResponse, successResponse } from '../utils/ErrorHandler';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        makeErrorResponse(400, 'Email and password are required');
      }

      // Attempt to login
      const token = await this.authService.login(email, password);

      // Return successful login response
      successResponse(res, { token }, 'Login successful');
    } catch (error) {
      handleErrorResponse(res, error);
    }   
  }

  async signin(req: Request, res: Response){

  }

  

}