import Comment from '../models/CommentModel';
import { Comment as CommentInterface } from '../interfaces/Comment';
import { makeErrorResponse } from '../utils/ErrorHandler';
import Lodging from '../models/LodgingModel';
import Tour from '../models/TourModel';
import { Transaction } from 'sequelize';

/**
 * Guardar un nuevo comentario y actualizar la calificación ponderada del hospedaje o tour
 */
export const saveComment = async (
    commentData: Omit<CommentInterface, 'id' | 'publishedAt'>,
): Promise<CommentInterface> => {
    return await Comment.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            let entityExists = false;

            if (commentData.entityType === 'tour') {
                entityExists =
                    (await Tour.findByPk(commentData.entityId, { transaction })) !== null;
            } else if (commentData.entityType === 'lodging') {
                entityExists =
                    (await Lodging.findByPk(commentData.entityId, { transaction })) !== null;
            }

            if (!entityExists) {
                throw makeErrorResponse(404, `No se encontró el ${commentData.entityType}`);
            }

            const newComment = await Comment.create(
                { ...commentData, publishedAt: new Date() },
                { transaction },
            );

            // Actualizar la calificación del hospedaje o tour
            await updateEntityRating(commentData.entityId, commentData.entityType, transaction);

            return newComment.toJSON() as CommentInterface;
        } catch (error) {
            throw error;
        }
    });
};

/**
 * Actualizar la calificación promedio del hospedaje o tour
 */
const updateEntityRating = async (
    entityId: number,
    entityType: 'tour' | 'lodging',
    transaction: Transaction,
) => {
    try {
        const { count, totalRating } = (await Comment.findOne({
            attributes: [
                [Comment.sequelize!.fn('COUNT', Comment.sequelize!.col('id')), 'count'],
                [Comment.sequelize!.fn('SUM', Comment.sequelize!.col('rating')), 'totalRating'],
            ],
            where: { entityId, entityType },
            raw: true,
            transaction,
        })) as unknown as { count: number; totalRating: number };

        if (count > 0) {
            const newRating = totalRating / count;

            if (entityType === 'lodging') {
                await Lodging.update(
                    { rating: newRating },
                    { where: { id: entityId }, transaction },
                );
            } else if (entityType === 'tour') {
                await Tour.update({ rating: newRating }, { where: { id: entityId }, transaction });
            }
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Buscar un comentario por ID
 */
export const findCommentById = async (id: string): Promise<CommentInterface> => {
    try {
        const comment = await Comment.findByPk(id, {
            include: [{ association: 'replies' }],
        });

        if (!comment) throw makeErrorResponse(404, 'Comentario');

        return comment.toJSON() as CommentInterface;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener todos los comentarios
 */
export const findAllComments = async (): Promise<CommentInterface[]> => {
    try {
        const comments = await Comment.findAll({
            where: { parentId: null },
            include: [
                {
                    model: Comment,
                    as: 'replies',
                    include: [
                        {
                            model: Comment,
                            as: 'replies',
                        },
                    ],
                },
            ],
            order: [['publishedAt', 'ASC']],
        });

        return comments.map((comment) => comment.toJSON() as CommentInterface);
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener comentarios de un hospedaje específico
 */
export const findCommentsByLodging = async (lodgingId: number): Promise<CommentInterface[]> => {
    try {
        const comments = await Comment.findAll({
            where: { entityId: lodgingId, entityType: 'lodging' },
        });

        return comments.map((comment) => comment.toJSON() as CommentInterface);
    } catch (error) {
        throw error;
    }
};

/**
 * Obtener comentarios de un tour específico
 */
export const findCommentsByTour = async (tourId: number): Promise<CommentInterface[]> => {
    try {
        const comments = await Comment.findAll({
            where: { entityId: tourId, entityType: 'tour' },
        });

        return comments.map((comment) => comment.toJSON() as CommentInterface);
    } catch (error) {
        throw error;
    }
};

/**
 * Responder a un comentario existente sin afectar la calificación
 */
export const replyToComment = async (
    commentId: number,
    replyData: Omit<CommentInterface, 'id' | 'publishedAt' | 'entityId' | 'entityType'>,
): Promise<CommentInterface> => {
    try {
        const parentComment = await Comment.findByPk(commentId);
        if (!parentComment) {
            throw makeErrorResponse(404, 'Comentario padre');
        }

        const newReply = await Comment.create({
            ...replyData,
            parentId: commentId,
            entityId: parentComment.entityId,
            entityType: parentComment.entityType,
            publishedAt: new Date(),
        });

        return newReply.toJSON() as CommentInterface;
    } catch (error) {
        throw error;
    }
};
