import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './productsandservices_display_row_1_carousel.css';
import './productsandservices_display_row_2.css'
import {Link} from 'react-router-dom';


// Make this be a slider listing carousel products

  const ProductsAndServices_Display_Row_1_Carousel_Listing = () => {
    const row1_IdsRef = useRef(JSON.parse(localStorage.getItem('row1_ids')) || []);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios(`http://localhost:5000/api/products?ids=${row1_IdsRef.current.join(',')}`);
          setProducts(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchProducts();
    }, []);
  
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