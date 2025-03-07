import { Response } from 'express';
import UserService from '../services/UserService';
import { handleErrorResponse, makeErrorResponse, successResponse } from '../utils/ErrorHandler';
import { CustomRequest } from '../utils/types/CustomRequest'; 

export class UserController {
  // Obtener información del usuario autenticado
  static async getUser(req: CustomRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id; 

      if (!userId) {
        throw makeErrorResponse(401, 'Unauthorized');
      }

      const user = await UserService.getUserById(userId);
      successResponse(res, user, 'User data retrieved successfully');
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  // Actualizar información del usuario autenticado
  static async updateUser(req: CustomRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw makeErrorResponse(401, 'Unauthorized');
      }
  
      const { name, user_name, email, ocupation, contact, gender } = req.body;
  
      if (!name || !user_name) {
        throw makeErrorResponse(400, 'Name and username are required fields.');
      }
  
      const updatedUser = await UserService.updateUser(userId, { name, user_name, email, ocupation, contact, gender });
  
      // Eliminar la contraseña antes de responder
      const userWithoutPassword = { ...updatedUser.toJSON(), password: undefined };
  
      successResponse(res, userWithoutPassword, 'User updated successfully');
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
  
};

export default UserController;
