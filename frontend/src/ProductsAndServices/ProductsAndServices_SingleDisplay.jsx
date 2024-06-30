import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./productsandservices_display_row_2.css";
import UseFetchProducts from "./useFetchProducts.js";
import { CartContext } from './CartContext';

const ProductsAndServices_SingleDisplay = () => {
  const { id } = useParams();
  const { data, isLoading, error } = UseFetchProducts();
  const { addToCart, updateQuantityInCart, cart } = useContext(CartContext);

  const products = data ? data[0][0] : null;
  const product = products ? products.find(product => product.id === Number(id)) : null;
  const cartProduct = cart ? cart.find(cartItem => cartItem.id === product?.id) : null;

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
    event.preventDefault();
    try {
      const currentQuantity = cartProduct ? cartProduct.quantity_in_stock : 0;
      console.log('Current cartProduct:', cartProduct);
      console.log('Current quantity before increment:', currentQuantity);
      await updateQuantityInCart(product.id, currentQuantity + 1);
    } catch (error) {
      console.error("An error occurred while increasing quantity:", error);
    }
  };

  const handleDec = async (event) => {
    event.preventDefault();
    try {
      const currentQuantity = cartProduct ? cartProduct.quantity_in_stock : 0;
      console.log('Current cartProduct:', cartProduct);
      console.log('Current quantity before decrement:', currentQuantity);
      if (currentQuantity > 1) {
        await updateQuantityInCart(product.id, currentQuantity - 1);
      }
    } catch (error) {
      console.error("An error occurred while decreasing quantity:", error);
    }
  };

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
          <button onClick={handleDec}>-</button>
          <button onClick={AddToCart}>AddToCart</button>
          <button onClick={handleInc}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsAndServices_SingleDisplay;
