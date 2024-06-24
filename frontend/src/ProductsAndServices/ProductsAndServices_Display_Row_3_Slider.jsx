import React from 'react';
// import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './productsandservices_display_row_3_slider.css';
import { Link } from 'react-router-dom';
import { NextArrow, PrevArrow } from './CustomArrows';

const ProductsAndServices_Display_Row_3_Slider = ({ products }) => {

  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 6,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

  return (
    <div className='carousel-container_row3'>
      <Link to={"/ProductsAndServices_Display_Row_3_Listing"}>
      <h3>See all products featured here</h3>
      </Link>
      <div>
      <Slider {...sliderSettings}>
        {products.map((product, id) => (
          <div key={id}>
            <Link to={`/ProductsAndServices_SingleDisplay/${product.id}`} key={product.id}>
            <span>{product.category}</span>
            <img src={product.image} alt={product.name}  />
            <p><small>low-prices</small>${product.price}</p>
            </Link>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default ProductsAndServices_Display_Row_3_Slider;