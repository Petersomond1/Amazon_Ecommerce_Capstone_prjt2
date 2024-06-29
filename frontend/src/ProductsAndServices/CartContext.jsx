import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartAndTotalFromBackend();
  }, []);

  const fetchCartAndTotalFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCart(response.data.cart);
      const totalValue = Number(response.data.total);
      setTotal(isNaN(totalValue) ? 0 : totalValue);
    } catch (error) {
      console.error('Error fetching cart from backend:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add_to_cart', { product });
      setCart(response.data.cart);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantityInCart = async (id, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity_in_stock: newQuantity }, { withCredentials: true });
      setCart(response.data.cart);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error updating quantity in cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${id}`, { withCredentials: true });
      setCart(response.data.cart);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      total,
      setTotal,
      fetchCartAndTotalFromBackend,
      addToCart,
      updateQuantityInCart,
      removeFromCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
