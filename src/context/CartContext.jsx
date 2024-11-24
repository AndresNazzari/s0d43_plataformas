import { createContext, useContext, useEffect, useState } from 'react';

const cartContext = createContext();
export const { Provider } = cartContext;

export const useCartContext = () => {
  return useContext(cartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    const totalQty = localStorage.getItem('setTotalQty');
    const totalPrice = localStorage.getItem('setTotalPrice');
    if (cart) {
      setCart(JSON.parse(cart));
      setTotalQty(JSON.parse(totalQty));
      setTotalPrice(JSON.parse(totalPrice));
    }
  }, []);

  const addToCart = (item, qty) => {
    let newCart = [];
    if (isInCart(item.id)) {
      newCart = cart.map((elem) => {
        if (elem.id === item.id) {
          return { ...elem, qty: elem.qty + qty };
        } else {
          return elem;
        }
      });
    } else {
      newCart = [...cart, { ...item, qty: qty }];
    }

    const newQty = totalQty + qty;
    const newTotalPrice = totalPrice + qty * item.price;

    setCart(newCart);
    setTotalQty(newQty);
    setTotalPrice(newTotalPrice);

    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('setTotalQty', JSON.stringify(newQty));
    localStorage.setItem('setTotalPrice', JSON.stringify(newTotalPrice));
  };

  const isInCart = (id) => {
    return cart.find((element) => element.id === id);
  };

  const removeFromCart = (item) => {
    const newQty = totalQty - item.qty;
    const newTotalPrice = totalPrice - item.qty * item.price;
    const newCart = cart.filter((e) => e.id !== item.id);

    setTotalQty(newQty);
    setTotalPrice(newTotalPrice);
    setCart(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('setTotalQty', JSON.stringify(newQty));
    localStorage.setItem('setTotalPrice', JSON.stringify(newTotalPrice));
  };

  const deleteCart = () => {
    setCart([]);
    setTotalQty(0);
    setTotalPrice(0);

    localStorage.removeItem('cart');
    localStorage.removeItem('setTotalQty');
    localStorage.removeItem('setTotalPrice');
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
