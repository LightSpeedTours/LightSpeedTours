import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    HasMany,
    BeforeValidate,
} from 'sequelize-typescript';
import Lodging from './LodgingModel';
import Tour from './TourModel';
import { ENTITY_TYPES, EntityType } from '../utils/types/EnumTypes';

@Table({
    tableName: 'comments',
    timestamps: false,
})
export default class Comment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column(DataType.INTEGER)
    declare userId: number;

    @Column(DataType.ENUM(...Object.values(ENTITY_TYPES)))
    declare entityType: EntityType;

    @ForeignKey(() => Lodging)
    @ForeignKey(() => Tour)
    @Column(DataType.INTEGER)
    declare entityId: number;

    @BelongsTo(() => Lodging, { foreignKey: 'entityId', constraints: false })
    declare lodging?: Lodging;

    @BelongsTo(() => Tour, { foreignKey: 'entityId', constraints: false })
    declare tour?: Tour;

    @Column(DataType.FLOAT)
    declare rating: number;

    @Column(DataType.TEXT)
    declare text: string;

    @Column(DataType.DATE)
    declare publishedAt: Date;

    @ForeignKey(() => Comment)
    @Column(DataType.INTEGER)
    declare parentId: number | null;

    @BelongsTo(() => Comment, { foreignKey: 'parentId' })
    declare parentComment?: Comment;

    @HasMany(() => Comment, { foreignKey: 'parentId' })
    declare replies?: Comment[];

    /**
     * Hook antes de la validación para asegurar que entityType y entityId sean coherentes.
     */
    @BeforeValidate
    static validateEntityAssignment(instance: Comment) {
        if (!instance.entityId) {
            throw new Error('El campo entityId es obligatorio.');
        }
        if (!instance.entityType) {
            throw new Error('El campo entityType es obligatorio.');
        }
        if (instance.entityType !== 'tour' && instance.entityType !== 'lodging') {
            throw new Error('El campo entityType debe ser "tour" o "lodging".');
        }
    }
}
