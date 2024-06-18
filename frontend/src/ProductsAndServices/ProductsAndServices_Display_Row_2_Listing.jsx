import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './productsandservices_display_row_1_carousel.css';
import './productsandservices_display_row_2.css'
import {Link} from 'react-router-dom';

// Make this to be a slider listing carousel products and output of clicking this gives single product display

const ProductsAndServices_Display_Row_2_Listing = () => {
    
  
  
  
      return (
    <>

        <div className='container'>
{products.map((product) => {
    return (
        
      <div key={product.id}>
        <Link to={`/ProductsAndServices_SingleDisplay/${product.id}`} key={product.id}>
      <div className="box_1">
          <div className="content">
              <h3>{product.name}</h3>
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

export default ProductsAndServices_Display_Row_2_Listing