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
import LodgingService from './LodgingServiceModel';
import Reservation from './ReservationModel';

@Table({ tableName: 'lodgings', timestamps: false })
export default class Lodging extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare planet: string;

    @Column({ type: DataType.STRING })
    declare location: string;

    @Column(DataType.TEXT)
    declare description: string;

    @Column(DataType.INTEGER)
    declare capacity: number;

    @Column(DataType.INTEGER)
    declare rooms: number;

    @Column(DataType.FLOAT)
    declare rating: number;

    @Column(DataType.FLOAT)
    declare cost: number;

    @BelongsToMany(() => Service, () => LodgingService)
    declare services: Service[];

    @HasMany(() => Comment, {
        foreignKey: 'entityId',
        scope: { entityType: 'lodging' },
    })
    declare comments: Comment[];

    @HasMany(() => Reservation, {
        foreignKey: 'entityId',
        scope: { entityType: 'lodging' },
    })
    declare reservations: Reservation[];
}
