import React from 'react';
import './productsandservices_display_row_5.css';
import { Link } from "react-router-dom";

const ProductsAndServices_Display_Row_5 = ({ products }) => {
   


 return (
<div className='external_container'>
    <Link to={'/ProductsAndServices_Display_Row_5_Listing'}>
<div> <h4>See all products featured here</h4> </div>
</Link>
             <div className="productsandservices_display_row_5_card">
            {products.map((product, index) => (
                <div key={index} className="box_single">
                 <Link
                to={`/ProductsAndServices_CategoryDisplay/${product?.category}`} 
                key={product?.category} > 
                  <div key={product?.id}>
                      <div className="content">
                        <h3>{product?.type}</h3>
                      </div>
                    <img src={product.image} alt={`Product ${index + 1}`} style={getStyle(index)} />
                    <h4>{product?.category}</h4>
                    </div>
                </Link>
                </div>
            ))}
        </div>
        </div>
    )
}

const getStyle = (index) => {
    switch(index) {
        case 1:
            return { height: '80%', width: '100%' };
        case 2:
        case 3:
        case 4:
            return { height: '100%', width: '30%' };
        case 6:
        case 7:
        case 8:
        case 9:
            return { height: '80%', width: '50%' };
        default:
            return {};
    }
}

export default ProductsAndServices_Display_Row_5;