import { IUser } from '../interfaces/User';
import User from '../models/UserModel';
import { makeErrorResponse } from '../utils/ErrorHandler';

class UserService {
  // Obtener información del usuario por ID (Getter)
  static async getUserById(userId: number): Promise<User> {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } // No devolvemos la contraseña por seguridad
    });

    if (!user) {
      throw makeErrorResponse(404, 'User not found');
    }

    return user;
  }

  // Actualizar información del usuario (Setter)
  static async updateUser(
    userId: number,
    updates: Partial<{ name: string; user_name: string; email: string; ocupation: string; contact: string; gender: string; }>
  ): Promise<User> {
    const user = await User.findByPk(userId);

    if (!user) {
      throw makeErrorResponse(404, 'User not found');
    }

    // Actualizar solo los campos permitidos
    Object.assign(user, updates);
    await user.save();

    return user;
  }
}

export default UserService;
