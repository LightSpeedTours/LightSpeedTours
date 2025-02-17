import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    BeforeValidate,
} from 'sequelize-typescript';
import Lodging from './LodgingModel';
import Tour from './TourModel';
import { ENTITY_TYPES, EntityType, LOCATION_TYPES, LocationType } from '../utils/types/EnumTypes';
import Cart from './CartModel';
import Order from './OrderModel';

@Table({
    tableName: 'reservations',
    timestamps: false,
})
export default class Reservation extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare userId: number;

    @Column(DataType.ENUM(...Object.values(LOCATION_TYPES)))
    declare locationType: LocationType;

    @ForeignKey(() => Cart)
    @ForeignKey(() => Order)
    @Column(DataType.INTEGER)
    declare locationId: number;

    @BelongsTo(() => Cart, { foreignKey: 'locationId', constraints: false })
    declare cart?: Cart;

    @BelongsTo(() => Order, { foreignKey: 'locationId', constraints: false })
    declare order?: Order;

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

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare quantity: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare subtotal: number;

    @Column({ type: DataType.DATE, allowNull: false })
    declare startDate: Date;

    @Column({ type: DataType.DATE, allowNull: false })
    declare endDate: Date;

    /**
     * Hook antes de la validación para asegurar que `entityType` y `entityId` sean coherentes.
     */
    @BeforeValidate
    static validateEntityAssignment(instance: Reservation) {
        if (!instance.entityId) {
            throw new Error('El campo entityId es obligatorio.');
        }
        if (!instance.entityType) {
            throw new Error('El campo entityType es obligatorio.');
        }
        if (instance.entityType !== 'tour' && instance.entityType !== 'lodging') {
            throw new Error('El campo entityType debe ser "tour" o "lodging".');
        }
        if (!instance.locationId) {
            throw new Error('El campo locationId es obligatorio.');
        }
        if (!instance.locationType) {
            throw new Error('El campo locationType es obligatorio.');
        }
        if (instance.locationType !== 'cart' && instance.locationType !== 'order') {
            throw new Error('El campo locationType debe ser "cart" o "order".');
        }
    }
}
