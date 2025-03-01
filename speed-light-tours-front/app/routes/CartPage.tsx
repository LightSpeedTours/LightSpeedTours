import CartItems from "~/features/cart/components/CartItems";
import CartSummary from "~/features/cart/components/CartSummary";
import Header from '../shared/components/OnlyHeader';

const CartPage = () => {
  return (
    <div className="w-full h-screen bg-black">
      {/* Header */}
      <Header />
      
      <div className="flex flex-col md:flex-row w-full p-6">
        {/* Sección de reservas - Ocupa 2/3 de la pantalla en dispositivos grandes */}
        <div className="w-full md:w-2/3 md:pr-2">
          <CartItems />
        </div>

        {/* Resumen de compra - Ocupa 1/3 en pantallas grandes y se apila debajo en pantallas pequeñas */}
        <div className="w-full md:w-1/3 md:pl-2 mt-4 md:mt-0">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
