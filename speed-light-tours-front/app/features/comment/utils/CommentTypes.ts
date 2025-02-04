import type { Response } from './ResponseTypes';

export interface Comment {
  id: number;
  userId: string;
  type: 'tour' | 'lodging';
  typeId: string;
  rating: number;
  text: string;
  publishedAt: Date;
  responses: Response[];
}

export interface CommentPayload {
  userId: string;
  type: 'tour' | 'lodging';
  typeId: string;
  rating: number;
  text: string;
}
  