import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey
  } from 'sequelize-typescript';
  import Lodging from './LodgingModel';
  import Service from './ServiceModel';
  
  @Table({ tableName: 'lodging_services', timestamps: false })
  export default class LodgingService extends Model {
    @ForeignKey(() => Lodging)
    @Column(DataType.INTEGER)
    declare lodgingId: number;
  
    @ForeignKey(() => Service)
    @Column(DataType.INTEGER)
    declare serviceId: number;
  }
  