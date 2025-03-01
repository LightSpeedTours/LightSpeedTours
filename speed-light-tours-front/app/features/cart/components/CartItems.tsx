import { useOrder } from "../utils/UseOrder";

const CartItems = () => {
  const { cartItems, removeItem } = useOrder();

  return (
    <div className="space-y-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-lg">Tu carrito está vacío.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-black border border-gray-600 shadow-md rounded-lg p-4 flex justify-between text-[#ffec80]"
          >
            <div>
              <h3 className="text-xl font-semibold">{item.tourName}</h3>
              <p className="text-gray-400">Fecha: {item.date}</p>
              <p className="text-gray-400">Personas: {item.guests}</p>
              <p className="font-bold">Precio: ${item.price}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
