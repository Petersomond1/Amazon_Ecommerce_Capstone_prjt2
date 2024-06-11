import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((sum, product) => {
      if (product) {
        return sum + ((product.sale_price || product.price) * product.quantity_InStock);
      } else {
        return sum;
      }
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(product => product && product.id!== id);
      return updatedCart;
    });
  };
  
  const updateQuantityInCart = async (id, quantity_InStock) => {
    await fetch(`/api/cart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity_InStock }),
    });
    setCart(prevCart => {
      const updatedCart = prevCart.map(product => product.id === id? {...product, quantity_InStock } : product);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, total, setTotal, removeFromCart, updateQuantityInCart }}>
      {children}
    </CartContext.Provider>
  );
};
