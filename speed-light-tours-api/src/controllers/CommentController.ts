import { Request, Response } from 'express';
import {
    findCommentById,
    saveComment,
    findAllComments,
    findCommentsByLodging,
    findCommentsByTour,
} from '../services/CommentService';
import { handleErrorResponse, makeErrorResponse } from '../utils/ErrorHandler';
import { validationResult } from 'express-validator';

export const getCommentController = async (req: Request, res: Response) => {
    try {
        const comment = await findCommentById(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const setCommentController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleErrorResponse(
                res,
                makeErrorResponse(
                    400,
                    errors
                        .array()
                        .map((err) => err.msg)
                        .join('. '),
                ),
            );
        }
        const newComment = await saveComment(req.body);
        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getCommentListController = async (_req: Request, res: Response) => {
    try {
        const comments = await findAllComments();
        res.status(200).json(comments);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getCommentsByLodgingController = async (req: Request, res: Response) => {
    try {
        const comments = await findCommentsByLodging(Number(req.params.lodgingId));
        res.status(200).json(comments);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getCommentsByTourController = async (req: Request, res: Response) => {
    try {
        const comments = await findCommentsByTour(Number(req.params.tourId));
        res.status(200).json(comments);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
