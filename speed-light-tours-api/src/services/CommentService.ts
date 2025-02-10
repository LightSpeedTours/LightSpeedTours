import Comment from '../models/CommentModel';
import { Comment as CommentInterface } from '../interfaces/Comment';
import Response from '../models/ResponseModel';
import { Response as ResponseInterface } from '../interfaces/Response';


export const saveComment = async (commentData: Omit<CommentInterface, 'id' | 'publishedAt'>): Promise<CommentInterface> => {
  const newComment = await Comment.create({
    ...commentData,
    publishedAt: new Date(),
  });

  return newComment.toJSON() as CommentInterface;
};


export const saveResponse = async (responseData: Omit<ResponseInterface, 'id' | 'publishedAt'>): Promise<ResponseInterface> => {
  const comment = await findCommentById(responseData.commentId);
  if (!comment) {
    throw new Error(`Comment with ID ${responseData.commentId} not found`);
  }

  const newResponse = await Response.create({
    ...responseData,
    publishedAt: new Date(),
  });

  return newResponse.toJSON() as ResponseInterface;
};


export const findCommentById = async (id: string): Promise<CommentInterface | null> => {
  const comment = await Comment.findByPk(id, {
    include: [{ association: 'responses' }],
  });

  return comment ? (comment.toJSON() as CommentInterface) : null;
};


export const findAllComments = async (): Promise<CommentInterface[]> => {
  const comments = await Comment.findAll({
    include: [{ association: 'responses' }],
  });

  return comments.map((comment) => comment.toJSON() as CommentInterface);
};
