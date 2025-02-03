import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import Response from './ResponseModel';


@Table({
  tableName: 'comments',
  timestamps: false,
})
export default class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare userId: string;

  @Column(DataType.ENUM('tour', 'lodging'))
  declare type: 'tour' | 'lodging';

  @Column(DataType.STRING)
  declare typeId: string;

  @Column(DataType.FLOAT)
  declare rating: number;

  @Column(DataType.TEXT)
  declare text: string;

  @Column(DataType.DATE)
  declare publishedAt: Date;

  @HasMany(() => Response) 
  declare responses: Response[];
}
