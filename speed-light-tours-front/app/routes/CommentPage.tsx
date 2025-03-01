import React, { useEffect, useState } from 'react';
import CommentForm from '../features/comment/components/CommentForm';
import CommentList from '../features/comment/components/CommentList';
import type { Comment } from '~/features/comment/utils/CommentTypes';
import { getComments } from '~/features/comment/services/CommentService';

const CommentsPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchComments();
  }, [refreshTrigger]);

  const fetchComments = async () => {
    try {
      const fetchedComments: Comment[] = await getComments();
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Comentarios</h1>
      <CommentForm onCommentAdded={handleCommentAdded} />
      <CommentList comments={comments} refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />
    </div>
  );
};

export default CommentsPage;
