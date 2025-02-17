import { body, param } from 'express-validator';

export const validateTour = [
    body('planet').isString().notEmpty().withMessage('Planet is required'),
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('duration').isFloat({ min: 0 }).withMessage('Duration must be a non-negative number'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    body('cost').isFloat({ min: 0 }).withMessage('Cost must be a non-negative number'),
    body('recommendations').isString().notEmpty().withMessage('Recommendations are required'),
    body('services').isArray({min: 1}).withMessage('services must be almost 1'),
];