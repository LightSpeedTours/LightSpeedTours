import { Comment, } from '../interfaces/Comment';

export class CommentView {
  private id: number;
  private userId: string;
  private type: 'tour' | 'lodging';
  private typeId: string;
  private rating: number;
  private text: string;
  private publishedAt: Date;


  constructor(comment: Comment) {
    this.id = comment.id;
    this.userId = comment.userId;
    this.type = comment.type;
    this.typeId = comment.typeId;
    this.rating = comment.rating;
    this.text = comment.text;
    this.publishedAt = comment.publishedAt;
  }

  // Getters
  get getId(): number {
    return this.id;
  }

  get getUserId(): string {
    return this.userId;
  }

  get getType(): 'tour' | 'lodging' {
    return this.type;
  }

  get getTypeId(): string {
    return this.typeId;
  }

  get getRating(): number {
    return this.rating;
  }

  get getText(): string {
    return this.text;
  }

  get getPublishedAt(): Date {
    return this.publishedAt;
  }

  // Setters
  set setId(id: number) {
    this.id = id;
  }

  set setUserId(userId: string) {
    this.userId = userId;
  }

  set setType(type: 'tour' | 'lodging') {
    this.type = type;
  }

  set setTypeId(typeId: string) {
    this.typeId = typeId;
  }

  set setRating(rating: number) {
    this.rating = rating;
  }

  set setText(text: string) {
    this.text = text;
  }

  set setPublishedAt(publishedAt: Date) {
    this.publishedAt = publishedAt;
  }
}
