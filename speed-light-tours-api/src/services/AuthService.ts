import { User } from '../interfaces/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { makeErrorResponse } from '../utils/ErrorHandler';

class AuthService {
  // Method to validate user login credentials
  async login(email: string, password: string): Promise<string> {
    try {
      // TODO: Replace with actual user lookup from your database
      const user = await this.findUserByEmail(email);

      if (!user) {
        throw makeErrorResponse(404, 'User not found');
      }

      // Compare provided password with stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw makeErrorResponse(401, 'Invalid credentials');
      }

      // Generate JWT token
      const token = this.generateToken(user);
      
      return token;
    } catch (error) {
      throw error;
    }
  }

  // Method to generate JWT token
  private generateToken(user: User): string {
    // TODO: Replace with your actual secret key from environment variables
    const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email 
      }, 
      SECRET_KEY, 
      { 
        expiresIn: '24h' 
      }
    );

    return token;
  }

  // Placeholder method for finding user by email
  private async findUserByEmail(email: string): Promise<User | null> {
    // TODO: Implement actual database query to find user
    // This should typically use your User model to query the database
    return null;
  }
}

export default AuthService;