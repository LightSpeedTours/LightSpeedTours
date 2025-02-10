import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Tour from './TourModel';
import Service from './ServiceModel';

@Table({ tableName: 'tour_services', timestamps: false })
export default class TourService extends Model {
  @ForeignKey(() => Tour)
  @Column
  declare tourId: number;

  @ForeignKey(() => Service)
  @Column
  declare serviceId: number;
}
