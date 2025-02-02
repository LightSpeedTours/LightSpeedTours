import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Comment from './CommentModel';

@Table({
  tableName: 'responses',
  timestamps: false,
})
export default class Response extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  userId!: string;

  @ForeignKey(() => Comment) 
  @Column(DataType.INTEGER)
  commentId!: number;

  @Column(DataType.TEXT)
  text!: string;

  @Column(DataType.DATE)
  publishedAt!: Date;

  @BelongsTo(() => Comment)
  comment!: Comment;
}
