 import React, { useEffect, useState } from 'react';
    import './productsandservices_display_row_3_slider.css';
    
    const ProductsAndServices_Row3_Listing = () => {
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
 
     return (
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
 )
}

export default ProductsAndServices_Row3_Listing