    import React from 'react';
    import './productsandservices_display_row_6_livestream_n_slider.css';
    import {Link} from 'react-router-dom';
    import {useFetchFilteredProductsByRow} from "./useFetchProducts.js";
    
    const ProductsAndServices_Display_Row_6_Listing = () => {
      const { data: products, isLoading, error } = useFetchFilteredProductsByRow(0); // Assuming rowId for Row 1 is 0

      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>An error occurred: {error.message}</div>;
    


    //     const row6_IdsRef = useRef(JSON.parse(localStorage.getItem('row6_ids')) || []);
    // const [products, setProducts] = useState([]);
    // // const [row6videoIds, setRow6VideoIds] = useState([]);
  
    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const response = await axios(`http://localhost:5000/api/products?ids=${row6_IdsRef.current.join(',')}`);
    //       setProducts(response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
  
    //   fetchProducts();
    // }, []); 

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

export default ProductsAndServices_Display_Row_6_Listing