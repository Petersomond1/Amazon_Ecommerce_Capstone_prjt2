import React from "react";
import { useParams } from "react-router-dom";
import "./productsandservices_display_row_2.css";
import UseFetchProducts from "./useFetchProducts.js";
import axios from "axios";

const ProductsAndServices_SingleDisplay = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { data, isLoading, error } = UseFetchProducts(); // Fetch all products

  // Check if data is defined and has the expected structure
  const products = data ? data[0][0] : null;
  // Directly find the product by ID when rendering
  const product = products ? products.find(product => product.id === Number(id)) : null;
console.log(product);
  if (isLoading) return <div style={{color: 'black'}}>Loading...</div>;
  if (error) return <div style={{color: 'black'}}>An error occurred: {error.message}</div>;
  if (!product) return <div style={{color: 'black'}}>Product not found</div>; // Show this if no product is found

  const handleAddToCart = async (event, id) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/add_to_cart/${product.id}`, {product}, { withCredentials: true });
      console.log("Here is the response", response);
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    }
  };

  // Render the product details
  return (
    <div className="container_row_2_cardsx4">
      <div key={product.id}>
        <div className="box_single">
          <div className="content">
            <h3>{product.category}</h3>
          </div>
          <img src={product.image} alt={product.name} />
          <div>
            <h3>{product.name}</h3>
          </div>
          <button onClick={handleAddToCart}>AddToCart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsAndServices_SingleDisplay;