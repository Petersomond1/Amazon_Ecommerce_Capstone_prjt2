import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './productsandservices_display_row_3_slider.css';

const ProductsAndServices_Display_Row_3_Slider = () => {

  const row3_IdsRef = useRef(JSON.parse(localStorage.getItem('row3_ids')) || []);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(`http://localhost:5000/api/products?ids=${row3_IdsRef.current.join(',')}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 6,
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
      <Slider {...sliderSettings}>
        {products.map((product, id) => (
          <div key={id}>
            <span>text1</span>
            <img src={product.image} alt={product.name}  />
            <p>text2</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsAndServices_Display_Row_3_Slider;