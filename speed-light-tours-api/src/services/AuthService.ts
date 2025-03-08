import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { makeErrorResponse } from '../utils/ErrorHandler';
import User from '../models/UserModel';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
    async login(email: string, password: string): Promise<string> {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw makeErrorResponse(404, 'User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw makeErrorResponse(401, 'Invalid credentials');
            }


            return AuthService.generateToken(user);
        } catch (error) {
            throw error;
        }
    }

    async signup(
        name: string,
        user_name: string,
        email: string,
        password: string,
        date_of_birth: Date,
        gender?: string,
        ocupation?: string,
        contact?: string,
    ): Promise<string> {
        try {
            const existingUser = await User.findOne({ where: { email } });
            const existingUsername = await User.findOne({ where: { user_name } });

            if (existingUser) {
                throw makeErrorResponse(400, 'Email is already registered');
            }
            if (existingUsername) {
                throw makeErrorResponse(400, 'Username is already taken');
            }


            const hashedPassword = await bcrypt.hash(password, 10);
            let foo: string | undefined = process.env.JWT_SECRET;
            console.log(foo);

            const newUser = await User.create({
                name,
                user_name,
                email,
                password: hashedPassword,
                date_of_birth,
                gender,
                ocupation,
                contact,
            });

            return AuthService.generateToken(newUser);
        } catch (error) {
            throw error;
        }
    }

    private static generateToken(user: User): string {
        return jwt.sign(
            {
                id: user.uniqueID,
                email: user.email,
                role: user.rol,
            },
            process.env.JWT_SECRET || 'secretKey',
            { expiresIn: '24h' },
        );
    }
}

export default AuthService;
