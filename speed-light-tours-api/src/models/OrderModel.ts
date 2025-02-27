import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
} from 'sequelize-typescript';
import Reservation from './ReservationModel';

@Table({
    tableName: 'orders',
    timestamps: false,
})
export default class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare userId: number;

    @HasMany(() => Reservation, {
        foreignKey: 'locationId',
        scope: { locationType: 'order' },
    })
    declare reservations: Reservation[];

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare totalAmount: number;
}
