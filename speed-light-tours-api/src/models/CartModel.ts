//Entidad Utilitaria para almacenar las reservas ya pagadas
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
    tableName: 'carts',
    timestamps: false,
})
export default class Cart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare userId: number;

    @HasMany(() => Reservation, {
        foreignKey: 'locationId',
        scope: { locationType: 'cart' },
    })
    declare reservations: Reservation[];

    @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
    declare totalPrice: number;
}
