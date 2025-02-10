import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

export const validateComment = [
  body('text').isString().notEmpty().withMessage('Text is required'),
  body('userId').isString().notEmpty().withMessage('User ID is required'),
  body('type').isIn(['tour', 'lodging']).withMessage('Type must be either "tour" or "lodging"'),
  body('typeId').isString().notEmpty().withMessage('Type ID is required'),
  body('rating')
    .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
    .custom((value) => value % 0.5 === 0).withMessage('Rating must be in increments of 0.5'),
];


export const validateResponse = [
  body('commentId').isInt({ min: 1 }).withMessage('Comment ID must be a positive integer'),
  body('userId').isString().notEmpty().withMessage('User ID is required'),
  body('text').isString().notEmpty().withMessage('Text is required'),
];