import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey
  } from 'sequelize-typescript';
  import Tour from './TourModel';
  import Service from './ServiceModel';
  
  @Table({ tableName: 'tour_services', timestamps: false })
  export default class TourService extends Model {
    @ForeignKey(() => Tour)
    @Column(DataType.INTEGER)
    declare tourId: number;
  
    @ForeignKey(() => Service)
    @Column(DataType.INTEGER)
    declare serviceId: number;
  }
  