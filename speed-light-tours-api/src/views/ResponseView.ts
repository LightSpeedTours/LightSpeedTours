import { Response } from '../interfaces/Response';

export class ResponseView {
  private id: number;
  private userId: string;
  private commentId: string;
  private text: string;
  private publishedAt: Date;

  constructor(response: Response) {
    this.id = response.id;
    this.userId = response.userId;
    this.commentId = response.commentId;
    this.text = response.text;
    this.publishedAt = response.publishedAt;
  }

  // Getters
  get getId(): number {
    return this.id;
  }

  get getUserId(): string {
    return this.userId;
  }

  get getCommentId(): string {
    return this.commentId;
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

  set setCommentId(commentId: string) {
    this.commentId = commentId;
  }

  set setText(text: string) {
    this.text = text;
  }

  set setPublishedAt(publishedAt: Date) {
    this.publishedAt = publishedAt;
  }
}
