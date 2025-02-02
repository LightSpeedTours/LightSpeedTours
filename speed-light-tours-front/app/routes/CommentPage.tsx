import React, { useState } from 'react';
import CommentForm from '../features/comment/components/CommentForm';
import CommentList from '../features/comment/components/CommentList';

const CommentsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1); 
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Comentarios</h1>
      <CommentForm onCommentAdded={handleCommentAdded} />
      <CommentList refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />
    </div>
  );
};

export default CommentsPage;
