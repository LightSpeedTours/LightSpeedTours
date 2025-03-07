import { Request, Response, NextFunction } from 'express';
import { makeErrorResponse, handleErrorResponse } from '../utils/ErrorHandler';

export const validateSignin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { name, user_name, email, password, date_of_birth, gender, ocupation, contact } = req.body;

    // Verificar campos obligatorios
    if (!name || !user_name || !email || !password || !date_of_birth) {
      throw makeErrorResponse(400, 'All required fields must be provided: name, user_name, email, password, date_of_birth');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw makeErrorResponse(400, 'Invalid email format');
    }


    // Validar date_of_birth (Formato YYYY-MM-DD y que sea una fecha válida)
    if (isNaN(Date.parse(date_of_birth))) {
      throw makeErrorResponse(400, 'Invalid date_of_birth format (Expected: YYYY-MM-DD)');
    }


    if (ocupation && ocupation.length > 100) {
      throw makeErrorResponse(400, 'Ocupation must be less than 100 characters');
    }

    if (contact && !/^\+?\d{7,15}$/.test(contact)) {
      throw makeErrorResponse(400, 'Invalid contact format (Must be a valid phone number)');
    }

    next(); // Pasar al controlador si todas las validaciones son correctas
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
