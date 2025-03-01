export interface ReviewsSectionProps {
  entityType: "lodging" | "tour";
  entityId: number;
}


export interface Comment {
  id: number;
  userId: string;
  entityType: 'tour' | 'lodging';
  entityId: number;
  rating: number;
  text: string;
  publishedAt: Date;
  replies: Comment[];
}

export interface CommentPayload {
  userId: string;
  entityType: 'tour' | 'lodging';
  entityId: number;
  rating?: number;
  text: string;
  parentId?: number;
}