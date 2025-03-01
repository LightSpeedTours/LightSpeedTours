import { useEffect, useState } from "react";
import { getCommentsByLodging, getCommentsByTour } from "../services/CommentService";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import type { Comment,ReviewsSectionProps } from "../utils/CommentTypes";

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ entityType, entityId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [refreshTrigger, entityId]);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      let fetchedComments: Comment[] = [];

      if (entityType === "lodging") {
        fetchedComments = await getCommentsByLodging(entityId);
      } else if (entityType === "tour") {
        fetchedComments = await getCommentsByTour(entityId);
      }

      setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Error al cargar comentarios.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="mt-6 w-full mx-auto p-4 bg-gray-800 shadow-md rounded-md">
      <h2 className="text-xl font-bold text-center text-white">Reseñas</h2>
      
      {/* Formulario para agregar comentario */}
      <CommentForm onCommentAdded={handleCommentAdded} />

      {/* Estado de carga */}
      {loading ? (
        <p className="text-gray-400 text-center">Cargando comentarios...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : comments.length > 0 ? (
        <CommentList comments={comments} refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />
      ) : (
        <p className="text-gray-400 text-center">No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
