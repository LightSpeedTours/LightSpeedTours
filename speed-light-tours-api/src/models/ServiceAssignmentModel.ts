import { 
  Table, 
  Column, 
  Model, 
  ForeignKey, 
  DataType, 
  PrimaryKey, 
  AutoIncrement, 
  BelongsTo,
  BeforeValidate 
} from 'sequelize-typescript';
import Service from './ServiceModel';
import Lodging from './LodgingModel';
import Tour from './TourModel';
import { ENTITY_TYPES, EntityType } from '../utils/types/EnumTypes';

@Table({ tableName: 'service_assignments', timestamps: false })
export default class ServiceAssignment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.ENUM(...Object.values(ENTITY_TYPES)))
  declare entityType: EntityType;

  @ForeignKey(() => Lodging)
  @ForeignKey(() => Tour)
  @Column(DataType.INTEGER)
  declare entityId: number;

  @ForeignKey(() => Service)
  @Column(DataType.INTEGER)
  declare serviceId: number;

  /**
   * Asociación dinámica con `Lodging` y `Tour`
   * Se usa `constraints: false` para evitar conflictos de clave foránea.
   */
  @BelongsTo(() => Lodging, { foreignKey: 'entityId', constraints: false })
  declare lodging?: Lodging;

  @BelongsTo(() => Tour, { foreignKey: 'entityId', constraints: false })
  declare tour?: Tour;

  @BelongsTo(() => Service)
  declare service?: Service;

  /**
   * Hook antes de la validación para asegurar que entityType y entityId sean coherentes.
   */
  @BeforeValidate
  static validateEntityAssignment(instance: ServiceAssignment) {
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
