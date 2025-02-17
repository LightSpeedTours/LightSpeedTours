import { HttpResponses } from '../utils/HttpResponses';
import { Response } from 'express';

export const handleErrorResponse = (res: Response, error: unknown) => {
    const err = error as Error & { status?: number };
    res.status(err.status || 500).json({ error: err.message || HttpResponses[500] });
};

export const makeErrorResponse = (status: number, entity?: string) => {
    const message =
        typeof HttpResponses[status] === 'function'
            ? HttpResponses[status](entity)
            : HttpResponses[status];

    return { status, message };
};
