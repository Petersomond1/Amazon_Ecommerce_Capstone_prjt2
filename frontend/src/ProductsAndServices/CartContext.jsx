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
            const response = await axios.get('/api/cart', { withCredentials: true });
            console.log('response at cartContext:', response);
            if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
                const data = response.data;
                console.log('data at cartContext:', data);
                setCart(data.cart);
                setTotal(data.total);
            } else {
                throw new Error('Response is not in JSON format');
            }
        } catch (error) {
            console.error('An error occurred while fetching the cart:', error);
        }
    };

    const removeFromCart = async (id) => {
        await axios.delete(`/api/cart/${id}`, { withCredentials: true });
        setCart(cart.filter(item => item.id !== id));
        updateTotal();
    };

    const updateQuantityInCart = async (id, quantity) => {
        await axios.put(`/api/cart/${id}`, { quantity_InStock: quantity }, { withCredentials: true });
        setCart(prevCart => {
            const updatedCart = prevCart.map(product => product.id === id ? { ...product, quantity_InStock: quantity } : product);
            return updatedCart;
        });
        updateTotal();
    };

    const updateTotal = () => {
        const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity_InStock, 0);
        setTotal(newTotal);
    };

    return (
        <CartContext.Provider value={{ cart, setCart, removeFromCart, total, setTotal, updateQuantityInCart }}>
            {children}
        </CartContext.Provider>
    );
};
