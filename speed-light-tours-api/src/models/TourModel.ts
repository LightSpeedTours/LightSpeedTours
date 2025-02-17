import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany,
    Unique,
    HasMany,
} from 'sequelize-typescript';
import Service from './ServiceModel';
import Comment from './CommentModel';
import TourService from './TourServiceModel';
import Reservation from './ReservationModel';

@Table({ tableName: 'tours', timestamps: false })
export default class Tour extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare planet: string;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column(DataType.TEXT)
    declare description: string;

    @Column(DataType.FLOAT)
    declare duration: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare route: string;

    @Column(DataType.INTEGER)
    declare capacity: number;

    @Column(DataType.FLOAT)
    declare rating: number;

    @Column(DataType.FLOAT)
    declare cost: number;

    @Column(DataType.TEXT)
    declare recommendations: string;

    @BelongsToMany(() => Service, () => TourService)
    declare services: Service[];

    @HasMany(() => Comment, {
        foreignKey: 'entityId',
        scope: { entityType: 'tour' },
    })
    declare comments: Comment[];

    @HasMany(() => Reservation, {
        foreignKey: 'entityId',
        scope: { entityType: 'tour' },
    })
    declare reservations: Reservation[];
}
