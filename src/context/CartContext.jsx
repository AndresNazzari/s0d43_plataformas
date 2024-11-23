import { createContext, useContext, useState } from 'react';

const cartContext = createContext();
export const { Provider } = cartContext;

export const useCartContext = () => {
  return useContext(cartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item, qty) => {
    setTotalQty(totalQty + qty);
    setTotalPrice(totalPrice + qty * item.price /* * item.discount */);

    if (isInCart(item.id)) {
      const newCart = cart.map((elem) => {
        if (elem.id === item.id) {
          return { ...elem, qty: elem.qty + qty };
        } else {
          return elem;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, qty: qty }]);
    }
  };

  const isInCart = (id) => {
    return cart.find((element) => element.id === id);
  };

  const removeFromCart = (item) => {
    setTotalQty(totalQty - item.qty);
    setTotalPrice(totalPrice - item.qty * item.price /* * item.discount */);

    const newCart = cart.filter((e) => e.id !== item.id);
    setCart(newCart);
  };

  const deleteCart = () => {
    setCart([]);
    setTotalQty(0);
    setTotalPrice(0);
  };

  const value = {
    totalQty,
    totalPrice,
    cart,
    addToCart,
    removeFromCart,
    deleteCart,
  };

  return <Provider value={value}>{children}</Provider>;
};
