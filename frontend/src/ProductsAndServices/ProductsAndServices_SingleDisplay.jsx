import React from "react";
import { useParams } from "react-router-dom";
import "./productsandservices_display_row_2.css";
import UseFetchProducts from "./useFetchProducts.js";
// import axios from "axios";
import { useContext } from 'react';
import { CartContext } from './CartContext';

const ProductsAndServices_SingleDisplay = () => {
  const { id } = useParams();
  const { data, isLoading, error } = UseFetchProducts();
  const { addToCart, updateQuantityInCart } = useContext(CartContext);

  const products = data ? data[0][0] : null;
  const product = products ? products.find(product => product.id === Number(id)) : null;

  if (isLoading) return <div style={{color: 'black'}}>Loading...</div>;
  if (error) return <div style={{color: 'black'}}>An error occurred: {error.message}</div>;
  if (!product) return <div style={{color: 'black'}}>Product not found</div>;

  const AddToCart = async (event) => {
    event.preventDefault();
    try {
      await addToCart(product);
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    }
  };

  const handleInc = async (event) => {
    // try {
    //   const response1 = await axios.put(`http://localhost:5000/api/add_to_cart/${product.id}`, { product }, { withCredentials: true });
    //   await updateQuantityInCart(product.id, product.quantity_in_stock + 1);
    // } catch (error) {
    //   console.error("An error occurred while increasing quantity:", error);
    // }
  };

  const handleDec = async (event) => {
    // try {
    //   const response2 = await axios.put(`http://localhost:5000/api/add_to_cart/${product.id}`, { product }, { withCredentials: true });
    //   await updateQuantityInCart(product.id, product.quantity_in_stock - 1);
    // } catch (error) {
    //   console.error("An error occurred while decreasing quantity:", error);
    // }
  };

  const handleChangeQuantity = async (event) => {
    // const quantity = parseInt(event.target.value, 10);
    // if (quantity > 0) {
    //   try {
    //     await updateQuantityInCart(product.id, quantity);
    //   } catch (error) {
    //     console.error("An error occurred while changing quantity:", error);
    //   }
    // }
  };

  // Render the product details
  return (
    <div className="container_row_2_cardsx4">
      <div key={product.id}>
        <div className="box_single">
          <div className="content">
            <h3>{product.category}</h3>
          </div>
          <img src={product.image} alt={product.name} className="product-image "/>
          <div>
            <h3>{product.name}</h3>
          </div>
          <button onClick={AddToCart}>AddToCart</button>
          <div>
            <button onClick={handleDec}>-</button>
            <input type="number" value={product.quantity_in_stock} onChange={handleChangeQuantity} />
            <button onClick={handleInc}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsAndServices_SingleDisplay;
