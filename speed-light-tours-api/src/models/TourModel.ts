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
import Service from './ServiceModel';
import TourService from './TourServiceModel';

@Table({ tableName: 'tours', timestamps: false })
export default class Tour extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare planet: String;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.FLOAT)
  declare duration: number;

  @Column(DataType.INTEGER)
  declare capacity: number;

  @Column(DataType.FLOAT)
  declare rating: number;

  @Column(DataType.FLOAT)
  declare cost: number;

  @Column(DataType.TEXT)
  declare recommendations: string;

  @BelongsToMany(() => Service, { through: () => TourService })
  declare services: Service[];
}
