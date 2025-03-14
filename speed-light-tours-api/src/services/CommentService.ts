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
 * Obtiene comentarios con estructura jerárquica
 * @param whereCondition Condición para filtrar los comentarios
 */
const getComments = async (whereCondition: object): Promise<CommentInterface[]> => {
    try {
        const comments = await Comment.findAll({
            where: { ...whereCondition, parentId: null },
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
 * Buscar un comentario por ID con estructura jerárquica
 */
export const findCommentById = async (id: string): Promise<CommentInterface> => {
    const comments = await getComments({ id });

    if (comments.length === 0) throw makeErrorResponse(404, 'Comentario no encontrado');

    return comments[0];
};

/**
 * Obtener todos los comentarios principales con respuestas
 */
export const findAllComments = async (): Promise<CommentInterface[]> => {
    return getComments({});
};

/**
 * Obtener comentarios principales de un hospedaje específico
 */
export const findCommentsByLodging = async (lodgingId: number): Promise<CommentInterface[]> => {
    return getComments({ entityId: lodgingId, entityType: 'lodging' });
};

/**
 * Obtener comentarios principales de un tour específico
 */
export const findCommentsByTour = async (tourId: number): Promise<CommentInterface[]> => {
    return getComments({ entityId: tourId, entityType: 'tour' });
};
