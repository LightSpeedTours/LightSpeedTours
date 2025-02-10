import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany,
    Unique
  } from 'sequelize-typescript';
  import Service from './ServiceModel';
  import LodgingService from './LodgingServiceModel';

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
  
    @Column(DataType.DATE)
    declare duration: Date;
  
    @BelongsToMany(() => Service, { through: () => LodgingService })
    declare services: Service[];
  }
  