    import React from 'react';
    // import {useEffect, useState } from 'react';
    import './productsandservices_display_row_5.css';
    import {Link} from 'react-router-dom';
    import {useFetchFilteredProductsByRow} from "./useFetchProducts.js";
    
    const ProductsAndServices_Display_Row_5_Listing = () => {
      const { data: products, isLoading, error } = useFetchFilteredProductsByRow(0); // Assuming rowId for Row 1 is 0

      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>An error occurred: {error.message}</div>;
    
        // const products = UseFetchProducts();
        // const [selectedProducts, setSelectedProducts] = useState([]);
        // useEffect(() => {
        //     if (products && row5productIds) {
        //         const filteredProducts = products.filter(product => row5productIds.includes(product.id));
        //         setSelectedProducts(filteredProducts);
        //     }
        // }, [products, row5productIds]);

   return (
    <>
     <div className='container'>
{selectedProducts.map((product) => {
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
export default ProductsAndServices_Display_Row_5_Listing