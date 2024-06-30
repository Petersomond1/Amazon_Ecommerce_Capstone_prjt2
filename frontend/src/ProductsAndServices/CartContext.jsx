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
      setCart(response.data.cart || []);
      const totalValue = Number(response.data.total);
      setTotal(isNaN(totalValue) ? 0 : totalValue);
    } catch (error) {
      console.error('Error fetching cart from backend:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const cartProduct = cart.find(cartItem => cartItem.id === product.id);
      if (cartProduct) {
        // If the product is already in the cart, increment the quantity
        await updateQuantityInCart(product.id, cartProduct.quantity_in_stock + 1);
      } else {
        // If the product is not in the cart, add it with quantity 1
        const response = await axios.post('http://localhost:5000/api/cart/add_to_cart', { product });
        setCart(response.data.cart || []);
        setTotal(response.data.total);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // const addToCart = async (product) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/cart/add_to_cart', { product });
  //     setCart(response.data.cart || []);
  //     setTotal(response.data.total);
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //   }
  // };

  const updateQuantityInCart = async (id, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 1) return;
    console.log('newQuantity', newQuantity);
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/update_quantity/${id}`, { newQuantity });
      setCart(response.data.cart || []);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error updating quantity in cart:', error);
    }
  };

  // const updateQuantityInCart = async (id, newQuantity) => {
  //   if (isNaN(newQuantity) || newQuantity < 1) return;
  //   console.log('newQuantity', newQuantity);
  //   try {
  //     const response = await axios.put(`http://localhost:5000/api/cart/update_quantity/${id}`, { newQuantity });
  //     setCart(response.data.cart || []);
  //     setTotal(response.data.total);
  //   } catch (error) {
  //     console.error('Error updating quantity in cart:', error);
  //   }
  // };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
      fetchCartAndTotalFromBackend();
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
      addToCart,
      removeFromCart,
      updateQuantityInCart,
      fetchCartAndTotalFromBackend
    }}>
      {children}
    </CartContext.Provider>
  );
};
