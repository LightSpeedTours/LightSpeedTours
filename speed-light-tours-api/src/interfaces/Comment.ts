export interface Comment {
  id: number;
  userId: string; 
  entityType: 'tour' | 'lodging'; 
  entityId: number; 
  rating: number; 
  text: string; 
  publishedAt: Date; 
}
