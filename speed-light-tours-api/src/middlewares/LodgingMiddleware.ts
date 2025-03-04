import { body } from 'express-validator';

export const validateLodging = [
    body('planet').isString().notEmpty().withMessage('Planet is required'),
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('location').isString().notEmpty().withMessage('Location is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    body('rooms').isInt({ min: 1 }).withMessage('Rooms must be a positive integer'),
    body('cost').isFloat({ min: 0 }).withMessage('Cost must be a non-negative number'),
    body('services').isArray({ min: 1 }).withMessage('services must be almost 1'),
];
