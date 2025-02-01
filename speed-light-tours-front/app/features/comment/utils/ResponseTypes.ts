export interface Response {
  id: number;
  userId: string;
  commentId: string;
  text: string;
  publishedAt: Date;
}


export interface ResponsePayload {
    userId: string;
    commentId: string;
    text: string;
}
