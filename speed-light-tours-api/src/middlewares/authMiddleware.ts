import { Request, Response, NextFunction } from 'express';
import { makeErrorResponse, handleErrorResponse } from '../utils/ErrorHandler';

export const validateSignin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { name, user_name, email, password, date_of_birth } = req.body;
    const errors: Record<string, string> = {};

        if (!name) errors.name = 'El nombre es obligatorio.';
        if (!user_name) errors.user_name = 'El nombre de usuario es obligatorio.';
        if (!email) errors.email = 'El correo electrónico es obligatorio.';
        if (!password) errors.password = 'La contraseña es obligatoria.';
        if (!date_of_birth) errors.date_of_birth = 'La fecha de nacimiento es obligatoria.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = 'Formato de correo electrónico inválido.';
    }

    if (date_of_birth && isNaN(Date.parse(date_of_birth))) {
      errors.date_of_birth = 'Formato de fecha inválido. Debe ser YYYY-MM-DD.';
    }

    if (Object.keys(errors).length > 0) {

      res.status(400).json({ success: false, errors: errors });
      return;
    }

    next(); 
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
