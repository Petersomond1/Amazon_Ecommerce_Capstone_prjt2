import React from 'react';
import './productsandservices_display_row_1_carousel.css';
import './productsandservices_display_row_2.css'
import {Link} from 'react-router-dom';
import {useFetchFilteredProductsByRow} from "./useFetchProducts.js";
// import {useFetchProducts} from "./useFetchProducts.js";

// Make this be a slider listing carousel products

  const ProductsAndServices_Display_Row_1_Carousel_Listing = () => {
    const { data: products, isLoading, error } = useFetchFilteredProductsByRow(0); // Assuming rowId for Row 1 is 0

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

      return (

    <>
        <div className='container'>
    {products.map((product) => {
    return (
      <div key={product.id}>
        <Link to={`/ProductsAndServices_SingleDisplay/${product.id}`} key={product.id}>
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
    )
})}
 </div>
 </>
    
  )
}

export default ProductsAndServices_Display_Row_1_Carousel_Listing