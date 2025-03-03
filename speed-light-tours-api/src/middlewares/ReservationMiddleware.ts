import { body } from 'express-validator';
import { param } from 'express-validator';
import { ENTITY_TYPES } from '../utils/types/EnumTypes';

export const validateReservation = [
    body('entityType')
        .isString()
        .notEmpty()
        .isIn(['tour', 'lodging'])
        .withMessage('EntityType must be "tour" or "lodging"'),

    body('entityId').isInt({ min: 1 }).withMessage('EntityId must be a positive integer'),

    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),

    body('subtotal').isFloat({ min: 0 }).withMessage('Subtotal must be a non-negative number'),

    body('startDate').isISO8601().toDate().withMessage('StartDate must be a valid date'),

    body('endDate')
        .isISO8601()
        .toDate()
        .withMessage('EndDate must be a valid date')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('EndDate must be after StartDate');
            }
            return true;
        }),
];

export const validateEntityType = [
    param('entityType')
        .isString()
        .notEmpty()
        .isIn(Object.values(ENTITY_TYPES))
        .withMessage(`EntityType must be one of: ${Object.values(ENTITY_TYPES).join(', ')}`),

    param('entityId').isInt({ min: 1 }).withMessage('EntityId must be a positive integer'),
];
