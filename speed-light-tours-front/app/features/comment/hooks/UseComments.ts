import { useState, useEffect } from 'react';
import { getComments } from '../services/CommentService';

export const useComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const data = await getComments();
    setComments(data);
  };

  return { comments, loadComments };
};
