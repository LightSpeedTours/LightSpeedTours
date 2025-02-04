export interface Comment {
  id: number;
  userId: string; 
  type: 'tour' | 'lodging'; 
  typeId: string; 
  rating: number; 
  text: string; 
  publishedAt: Date; 
}
