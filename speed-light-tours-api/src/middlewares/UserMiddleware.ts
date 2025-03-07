import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { makeErrorResponse, handleErrorResponse } from '../utils/ErrorHandler';
import { CustomRequest } from '../utils/types/CustomRequest';

export const authenticateUser = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      throw makeErrorResponse(401, 'Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey') as {
      id: number;
      email: string;
      role: string;
    };

    req.user = decoded; // Ahora TypeScript reconoce `req.user`
    console.log(req.user)
    next();
  } catch (error) {
    handleErrorResponse(res, makeErrorResponse(401, 'Invalid or expired token'));
  }
};


export const decodeUserPayload = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      throw makeErrorResponse(401, 'Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey') as {
      name: string;
      user_name: string;
      email: string;
      ocupation?: string;
      contact?: string;
      gender?: string;
    };

    // Agregar datos al body sin sobrescribir los enviados desde el frontend
    req.body = { ...req.body, ...decoded };

    next();
  } catch (error) {
    handleErrorResponse(res, makeErrorResponse(401, 'Invalid or expired token'));
  }
};

