export interface Service {
    id: number;
    name: string;
    description: string;
    entityType: 'lodging' | 'tour'; 
    entityId: number;
  }
  