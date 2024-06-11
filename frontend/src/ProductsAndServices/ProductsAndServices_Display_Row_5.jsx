import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './productsandservices_display_row_5.css';

const ProductsAndServices_Display_Row_5 = () => {
   

  const row5_IdsRef = useRef(JSON.parse(localStorage.getItem('row5_ids')) || []);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(`http://localhost:5000/api/products?ids=${row5_IdsRef.current.join(',')}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []); 

 return (
        <div className='container'>
            {products.map((product, index) => (
                <div key={index} className="box_single">
                    <img src={product.image} alt={`Product ${index + 1}`} style={getStyle(index)} />
                </div>
            ))}
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



//     const image1 = selectedProducts.map((product, index) => {product.image[index]});
//     const image2 = selectedProducts.map((product, index) => {product.image[index]});
//     const image3 = selectedProducts.map((product, index) => {product.image[index]});
//     const image4 = selectedProducts.map((product, index) => {product.image[index]});
//     const image5 = selectedProducts.map((product, index) => {product.image[index]});
//     const image6 = selectedProducts.map((product, index) => {product.image[index]});
//     const image7 = selectedProducts.map((product, index) => {product.image[index]});
//     const image8 = selectedProducts.map((product, index) => {product.image[index]});
//     const image9 = selectedProducts.map((product, index) => {product.image[index]});
//     const image10 = selectedProducts.map((product, index) => {product.image[index]});

//   return (
//     <div className='container'>
//       <div className="box_single">
//         <img src={image1} alt="Product 1" />
//       </div>

//     <div className="box_single">
//      <span> <img src={image2} alt="Product 2" style={{ height: '80%', width: '100%' }}/></span>
//         <span className='image3_row'>
//             <img src={image3} alt="Product 3" style={{ height: '100%', width: '30%' }}/>
//             <img src={image4} alt="Product 4" style={{ height: '100%', width: '30%' }}/>
//             <img src={image5} alt="Product 5" style={{ height: '100%', width: '30%' }}/>
//         </span>
//     </div>

//       <div className="box_single">
//         <img src={image6} alt="Product 6" />
//       </div>

//       <div className="box_single">
//         <div className='img2by2'>
//           <img src={image7} alt="Product 7" style={{height:'80%', width:'50%'}}/>
//           <img src={image8} alt="Product 8" style={{height:'80%', width:'50%'}}/>
//         </div>
//         <div className='img2by2'>
//           <img src={image9} alt="Product 9" style={{height:'80%', width:'50%'}}/>
//           <img src={image10} alt="Product 10" style={{height:'80%', width:'50%'}}/>
//         </div>
//       </div>
//     </div>
//   )
// }