import { useEffect, useState } from 'react';
import { getUserCart, removeCartItem } from '../services/CartService';
import type { Cart } from '../utils/CartTypes';
import type { Reservation } from '~/features/reservation/utils/ReservationTypes';
import ConfirmModal from '~/shared/components/ConfirmModal';

const CartItems = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserCart();
      if (data) setCart(data);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      setError('Hubo un problema al cargar el carrito.');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async () => {
    if (confirmDelete === null) return;

    try {
      await removeCartItem(confirmDelete);
      setConfirmDelete(null);
      await fetchCart(); // Actualizar carrito después de eliminar
    } catch (error) {
      console.error('Error al eliminar el elemento del carrito:', error);
      setError('No se pudo eliminar el elemento.');
    }
  };

  if (loading) return <p className="text-gray-400 text-lg">Cargando carrito...</p>;
  if (error) return <p className="text-red-500 text-lg">{error}</p>;

  return (
    <div className="space-y-4">
      {!cart || cart.reservations.length === 0 ? (
        <p className="text-gray-400 text-lg">Tu carrito está vacío.</p>
      ) : (
        cart.reservations.map((item: Reservation) => (
          <div
            key={item.id}
            className="bg-black border border-gray-600 shadow-md rounded-lg p-4 flex justify-between text-[#ffec80]"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {item.entityType === 'lodging' ? 'Hospedaje' : 'Tour'} - ID {item.entityId}
              </h3>
              <p className="text-gray-400">
                Inicio: {new Date(item.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-400">Fin: {new Date(item.endDate).toLocaleDateString()}</p>
              <p className="text-gray-400">Cantidad: {item.quantity}</p>
              <p className="font-bold">Subtotal: ${item.subtotal.toFixed(2)}</p>
            </div>
            <button
              onClick={() => setConfirmDelete(item.id)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              X
            </button>
          </div>
        ))
      )}

      {confirmDelete !== null && (
        <ConfirmModal
          message="¿Quieres cancelar tu reserva?"
          onConfirm={removeItem}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default CartItems;
