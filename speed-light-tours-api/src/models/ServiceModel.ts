import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany,
    Unique,
} from 'sequelize-typescript';
import Lodging from './LodgingModel';
import Tour from './TourModel';
import LodgingService from './LodgingServiceModel';
import TourService from './TourServiceModel';

@Table({ tableName: 'services', timestamps: false })
export default class Service extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    declare description: string;

    @BelongsToMany(() => Lodging, () => LodgingService)
    declare lodgings: Lodging[];

    @BelongsToMany(() => Tour, () => TourService)
    declare tours: Tour[];
}
