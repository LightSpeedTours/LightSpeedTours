import { Request, Response } from 'express';
import { findCommentById, saveComment, findAllComments, saveResponse } from '../services/CommentService';
import { Comment } from '../interfaces/Comment';
import { Response as CommentResponse } from '../interfaces/Response';


export const getCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await  findCommentById(id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comment' });
  }
};

export const setCommentController = async (req: Request, res: Response) => {
  const comment: Omit<Comment, 'publishedAt'> = req.body;

  try {
    const newComment = await saveComment(comment);
    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

export const getCommentListController = async (_req: Request, res: Response) => {
  try {
    const comments = await findAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};

export const setResponseController = async (req: Request, res: Response) => {
    const response: Omit<CommentResponse, 'publishedAt'> = req.body;
  
    try {
      const newResponse = await saveResponse(response);
      res.status(201).json({ message: 'Response created successfully', response: newResponse });
    } catch (error: any) {
      if (error.message.includes('Comment with ID')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create response' });
      }
    }
};

