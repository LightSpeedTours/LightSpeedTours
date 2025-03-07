import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { handleErrorResponse, makeErrorResponse, successResponse } from '../utils/ErrorHandler';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Usa una función de flecha para preservar el contexto de 'this'
  login = async (req: Request, res: Response) : Promise<void> => {
    try {
      const { email, password } = req.body;
      
      // Middleware: Validate input
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

  signin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, user_name, email, password, date_of_birth, gender, ocupation, contact } = req.body;

      // Validate required fields
      if (!name || !user_name || !email || !password || !date_of_birth) {
        throw makeErrorResponse(400, 'All required fields must be provided');
      }

      // Call signup service
      const token = await this.authService.signup(name, user_name, email, password, date_of_birth, gender, ocupation, contact);

      // Return successful signup response
      successResponse(res, { token }, 'User registered successfully');
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };
  
}
  
export default new AuthController();