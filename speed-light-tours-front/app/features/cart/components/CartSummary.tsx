import Button from "~/shared/components/Button";
import { useOrder } from "../utils/UseOrder";

const CartSummary = () => {
  const { cartItems } = useOrder();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="bg-black border border-gray-600 shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-[#ffec80]">Resumen de Compra</h2>
      <p className="text-lg">
        Total: <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </p>
      <div className="mt-4">
        <Button text="Pagar Ahora" onClick={() => alert("Procesando pago...")} />
      </div>
    </div>
  );
};

export default CartSummary;
