import { useCartContext } from '../../context/CartContext.jsx';
import { CartTable } from '../../components/CartTable';
import { Checkout } from '../../components/Checkout';
export const Cart = () => {
  const { cart } = useCartContext();

  return (
    <div className="flex flex-col items-center  justify-center">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        Carrito de Compras
      </h1>
      {cart.length === 0 ? (
        <p className="text-3xl font-bold text-center mt-6 mb-4">
          No hay productos en el carrito
        </p>
      ) : (
        <>
          <CartTable />
          <Checkout />
        </>
      )}
    </div>
  );
};
