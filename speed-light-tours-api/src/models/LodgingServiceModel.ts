import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Lodging from './LodgingModel';
import Service from './ServiceModel';

@Table({ tableName: 'lodging_services', timestamps: false })
export default class LodgingService extends Model {
  @ForeignKey(() => Lodging)
  @Column
  declare lodgingId: number;

  @ForeignKey(() => Service)
  @Column
  declare serviceId: number;
}
