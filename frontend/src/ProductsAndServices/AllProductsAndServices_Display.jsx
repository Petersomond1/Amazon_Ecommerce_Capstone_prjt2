import React, { useState, useEffect } from "react";
import axios from "axios";
import "./allproductsandservices_display.css";
import { CartContext } from './CartContext.jsx'; 

function AllProductsAndServices_Display() {
  const [products, setProducts] = useState([]);
  const { cart, setCart, total, setTotal } = React.useContext(CartContext);

  const addToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/add_to_cart', product);
      if (response.status === 200) {
        setCart(response.data.cart);
        setTotal(response.data.total);
      } else {
        console.error('Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product.id!== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/allproducts`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <>
      <div style={{ color: "black" }}>
        All Products and Services Display/Listing
      </div>
      <div className="container">
      {products.map((product, index) => (
        <div className="card" key={index}>
          <h2>{product.name}</h2>
          <h2>{product.category}</h2>
          <img src={product.image} alt={product.name} />
          {product.sale_price && (
            <div>
              <h2>{product.sale_price}</h2>
              <h2 style={{ textDecoration: "line-through" }}>
                {product.price}
              </h2>
            </div>
          )}
          {!product.sale_price && (
            <div>
              <h2>{product.price}</h2>
            </div>
          )}
          <h2>{product.description}</h2>
          <form onSubmit={(e) => { e.preventDefault(); addToCart(product); }}>
                 <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="name" value={product.name} />
                <input type="hidden" name="description" value={product.description } />
                <input type="hidden" name="price" value={product.price} />
                <input type="hidden" name="sale_price" value={product.sale_price || '' } />
                <input type="hidden" name="quantity_InStock" value={1} />
                <input type="hidden" name="image" value={product.image} />
                <input type="hidden" name="video_image" value={product.video} />
                <input type="hidden" name="category" value={product.category} />
                <input type="hidden" name="type" value={product.type} />
                <input type="hidden" name="ratings" value={product.ratings} />
                <input type="hidden" name="reviews" value={product.reviews} />
                <input type="hidden" name="prime" value={product.prime} />
                <input type="hidden" name="soldby" value={product.soldby} />
                <input type="hidden" name="featured" value={product.featured} />
                <input type="submit" value='Add to Cart' className="btn" onClick={(e) => { e.preventDefault(); addToCart(product); }}/>
            </form>
          {/* <button onClick={() => addToCart(product)}>Add to CART</button> */}
          {/* <button onClick={() => deleteProduct(product.id)}>Delete Product</button> */}
        </div>
      ))}
      </div>
    </>
  );
}

export default AllProductsAndServices_Display;
