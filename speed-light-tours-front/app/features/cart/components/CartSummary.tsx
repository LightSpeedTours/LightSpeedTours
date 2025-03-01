import { useEffect, useState } from 'react';
import Button from '~/shared/components/Button';
import { getUserCart, payCart } from '../services/CartService';
import type { Cart } from '../utils/CartTypes';
import type { Reservation } from '~/features/reservation/utils/ReservationTypes';
import ConfirmModal from '~/shared/components/ConfirmModal';

const CartSummary = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false); // Estado para deshabilitar botón al pagar

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

  const payForCart = async () => {
    setIsPaying(true); // Deshabilitar el botón mientras se procesa el pago
    try {
      await payCart();
      setSuccessModal(true);
      await fetchCart(); // Actualizar carrito después del pago
    } catch (error) {
      console.error('Error al pagar el carrito:', error);
      setError('No se pudo procesar el pago.');
    } finally {
      setIsPaying(false); // Habilitar botón nuevamente después del pago
    }
  };

  const totalPrice =
    cart?.reservations.reduce((total, item: Reservation) => total + item.subtotal, 0) || 0;

  const isCartEmpty = !cart || cart.reservations.length === 0;

  if (loading) return <p className="text-gray-400 text-lg">Cargando resumen...</p>;
  if (error) return <p className="text-red-500 text-lg">{error}</p>;

  return (
    <div className="bg-black border border-gray-600 shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-[#ffec80]">Resumen de Compra</h2>
      <p className="text-lg">
        Total: <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </p>
      <div className="mt-4">
        <Button text="Pagar Ahora" onClick={payForCart} disabled={isCartEmpty || isPaying} />
      </div>

      {successModal && (
        <ConfirmModal
          message="¡Reserva pagada con éxito!"
          onConfirm={() => setSuccessModal(false)}
          onCancel={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default CartSummary;
