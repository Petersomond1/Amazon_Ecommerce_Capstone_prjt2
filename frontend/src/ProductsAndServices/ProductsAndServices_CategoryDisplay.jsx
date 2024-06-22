import React from "react";
import { useParams } from "react-router-dom";
import "./productsandservices_display_row_2.css";
import UseFetchProducts from "./useFetchProducts.js";
import { Link } from "react-router-dom";

const ProductsAndServices_CategoryDisplay = () => {
  const { category } = useParams(); // Get the category from the URL
  const { data, isLoading, error } = UseFetchProducts(); // Fetch all products

  // Check if data is defined and has the expected structure
  const allProducts = data ? data[0][0] : null;
  // Filter products by category
  const productsInCategory = allProducts ? allProducts.filter(product => product.category === category) : [];

  if (isLoading) return <div style={{color: 'black'}}>Loading...</div>;
  if (error) return <div style={{color: 'black'}}>An error occurred: {error.message}</div>;
  if (productsInCategory.length === 0) return <div style={{color: 'black'}}>Product not found</div>; // Show this if no product is found

  return (
    <>
      <div className='container'>
        {productsInCategory.map((product) => (
          <div key={product.id}>
            <Link to={`/ProductsAndServices_SingleDisplay/${product.id}`}>
              <div className="box_1">
                <div className="content">
                  <h3>{product.category}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
                <img src={product.image} alt={product.name} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsAndServices_CategoryDisplay;