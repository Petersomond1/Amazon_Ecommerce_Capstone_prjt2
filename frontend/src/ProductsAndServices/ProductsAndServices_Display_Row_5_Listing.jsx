    import React, {useEffect, useState } from 'react';
    import './productsandservices_display_row_5_cardsx10.css';
    
    const ProductsAndServices_Row5_Listing = () => {
        const products = UseFetchProducts();
        const [selectedProducts, setSelectedProducts] = useState([]);
    
        useEffect(() => {
            if (products && row5productIds) {
                const filteredProducts = products.filter(product => row5productIds.includes(product.id));
                setSelectedProducts(filteredProducts);
            }
        }, [products, row5productIds]);

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
export default ProductsAndServices_Row5_Listing