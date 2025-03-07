import { HttpResponses } from '../utils/HttpResponses';
import { Response } from 'express';

export const handleErrorResponse = (res: Response, error: unknown) => {
    const err = error as Error & { status?: number };
    res.status(err.status || 500).json({ error: err.message || HttpResponses[500] });
};

export const makeErrorResponse = (status: number, entity?: string) => {
    // Comentado por CAMILO
    // const message =
    //     typeof HttpResponses[status] === 'function'
    //         ? HttpResponses[status](entity)
    //         : HttpResponses[status];


        const message = entity; // COMENTAR EN PRODUCCION
    return { status, message };
};

export const successResponse = (res: Response, data: any, message: string) => 
    res.status(200).json({ message, data });
