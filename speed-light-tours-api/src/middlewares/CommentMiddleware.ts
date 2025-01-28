import { Request, Response, NextFunction } from 'express';
import { Comment } from '../interfaces/Comment';
import { Response as CommentResponse } from '../interfaces/Response';

export const validateComment = (req: Request, res: Response, next: NextFunction): void => {
  const { text, userId, type, typeId, rating }: Partial<Comment> = req.body;

  if (!text || !userId || !type || !typeId || rating === undefined) {
    res.status(400).json({ error: 'All fields (text, userId, type, typeId, and rating) are required' });
  } else if (rating < 0 || rating > 5 || rating % 0.5 !== 0) {
    res.status(400).json({ error: 'Rating must be between 0 and 5 in increments of 0.5' });
  } else {
    next();
  }
};

export const validateResponse = (req: Request, res: Response, next: NextFunction): void => {
  const { commentId, userId, text }: Partial<CommentResponse> = req.body;

  if (!commentId || !userId || !text) {
    res.status(400).json({ error: 'All fields (commentId, userId, and description) are required' });
  } else {
    next();
  }
};
