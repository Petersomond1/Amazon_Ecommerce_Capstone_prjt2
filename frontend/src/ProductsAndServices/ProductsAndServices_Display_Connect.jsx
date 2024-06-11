import React from "react";
import ProductsAndServices_Display_Row_1_Carousel from "./ProductsAndServices_Display_Row_1_Carousel";
import ProductsAndServices_Display_Row_2 from "./ProductsAndServices_Display_Row_2";
import "./productsandservices_display.css";
import ProductsAndServices_Display_Row_3_Slider from "./ProductsAndServices_Display_Row_3_Slider";
import ProductsAndServices_Display_Row_4_Slider from "./ProductsAndServices_Display_Row_4_Slider";
import ProductsAndServices_Display_Row_5 from "./ProductsAndServices_Display_Row_5";
import ProductsAndServices_Display_Row_6_Livestream_n_Slider from './ProductsAndServices_Display_Row_6_Livestream_n_Slider';
import {Link} from 'react-router-dom';

export const ProductsAndServices_Display_Connect = () => {
 
  return (
    <div className="productsandservices_display_container">
      <div className="productsandservices_display_container_carousel">
        <Link to={`ProductsAndServices_Display_Row_1_Carousel_Listing`}> 
          <ProductsAndServices_Display_Row_1_Carousel />
        </Link>
      </div>
      <div className="productsandservices_display_rows">
        <ProductsAndServices_Display_Row_2 />
        <br />
        <ProductsAndServices_Display_Row_3_Slider />
        <br />
        <ProductsAndServices_Display_Row_4_Slider />
        <br />
        <ProductsAndServices_Display_Row_5 />
        <ProductsAndServices_Display_Row_6_Livestream_n_Slider/>
      </div>
    </div>
  );
};

export default ProductsAndServices_Display_Connect;