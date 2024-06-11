import React, { useState } from "react";
import './admindashboard-css.css';
import axios from 'axios';

function AdminDashboard() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    sale_price: '',
    quantity_InStock: '',
    image: '',
    video_image: '',
    category: '',
    type: '',
    ratings: '',
    reviews: '',
    prime: '',
    soldby: '',
    featured: ''
  });


  const [formData, setFormData] = useState({
    row1: '',
    row1_ids: '',
    row2: '',
    row2_ids: '',
    row3: '',
    row3_ids: '',
    row4: '',
    row4_ids: '',
    row5: '',
    row5_ids: '',
    row6: '',
    row6_ids: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const idsData = {
      row1: formData.row1,
      row1_ids: formData.row1_ids.split(',').map(Number),
      row2: formData.row2,
      row2_ids: formData.row2_ids.split(',').map(Number),
      row3: formData.row3,
      row3_ids: formData.row3_ids.split(',').map(Number),
      row4: formData.row4,
      row4_ids: formData.row4_ids.split(',').map(Number),
      row5: formData.row5,
      row5_ids: formData.row5_ids.split(',').map(Number),
      row6: formData.row6,
      row6_ids: formData.row6_ids.split(',').map(Number),
    };

    
try {
  const response = await axios.post('http://localhost:5000/api/row_ids', idsData);
  console.log('Successfully updated rows:', response.data);
} catch (error) {
  if (error.response) {
    console.error('Backend error:', error.response.data);
    console.error('Status code:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {console.error('No response received:', error.request);
  } else {console.error('Error:', error.message);
  }
}

  const handleChange2 = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const add_product_to_database = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products', product); 
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(`HTTP error! status: ${error.response.status}`);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const response = await axios.put(`/api/products/${id}`, product);
      console.log(response.data);
    } catch (error) {
      console.error(`HTTP error! status: ${error.response.status}`);
    }
  };

     return (
      <>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="row1" value={formData.row1} onChange={handleChange} placeholder="Enter row name" />
          <input name="row1_ids" value={formData.row1_ids} onChange={handleChange} placeholder="Comma separated numbers for row 1" />
        </div>
        <div>
          <label>Name:</label>
          <input name="row2" value={formData.row2} onChange={handleChange} placeholder="Enter row name" />
          <input name="row2_ids" value={formData.row2_ids} onChange={handleChange} placeholder="Comma separated numbers for row 2" />
        </div>
        <div>
          <label>Name:</label>
          <input name="row3" value={formData.row3} onChange={handleChange} placeholder="Enter row name" />
          <input name="row3_ids" value={formData.row3_ids} onChange={handleChange} placeholder="Comma separated numbers for row 3" />
        </div>
        <div>
          <label>Name:</label>
          <input name="row4" value={formData.row4} onChange={handleChange} placeholder="Enter row name" />
          <input name="row4_ids" value={formData.row4_ids} onChange={handleChange} placeholder="Comma separated numbers for row 4" />
        </div>
        <div>
          <label>Name:</label>
          <input name="row5" value={formData.row5} onChange={handleChange} placeholder="Enter row name" />
          <input name="row5_ids" value={formData.row5_ids} onChange={handleChange} placeholder="Comma separated numbers for row 5" />
        </div>
        <div>
          <label>Name:</label>
          <input name="row6" value={formData.row6} onChange={handleChange} placeholder="Enter row name" />
          <input name="row6_ids" value={formData.row6_ids} onChange={handleChange} placeholder="Comma separated numbers for row 6" />
        </div>
        <button type="submit">Submit</button>
      </form>
<br />
<hr />
<br />
        <form action="http://localhost:5000/api/products" method="post" onSubmit={(e) => { e.preventDefault(); add_product_to_database(product); }}>
                 <label htmlFor="name"></label>
                 <input type="text" id="name" name="name" value={product.id} onChange={handleChange2} placeholder="name"/>
                  <label htmlFor="description"></label>
                  <input type="text" id="description" name="description" value={product.description } onChange={handleChange2} placeholder="description"/>
                  <label htmlFor="price"></label>
                  <input type="text" id="price" name="price" value={product.price || '' } onChange={handleChange2} placeholder="price"/>
                  <label htmlFor="sale_price"></label>
                  <input type="text" id="sale_price" name="sale_price" value={product.sale_price || '' } onChange={handleChange2} placeholder="sale_price"/>
                  <label htmlFor="quantity_InStock"></label>
                  <input type="text" id="quantity_InStock" name="quantity_InStock" value={1} onChange={handleChange2} placeholder="name"/>
                  <label htmlFor="image"></label>
                  <input type="text" id="image" name="image" value={product.image} onChange={handleChange2} placeholder="image"/>
                  <label htmlFor="video_image"></label>
                  <input type="text" id="video_image" name="video_image" value={product.video} onChange={handleChange2} placeholder="video_image"/>
                  <label htmlFor="category"></label>
                  <input type="text" id="category" name="category" value={product.category}onChange={handleChange2} placeholder="category"/>
                  <label htmlFor="type"></label>
                  <input type="text" id="type" name="type" value={product.type} onChange={handleChange2} placeholder="type"/>
                  <label htmlFor="ratings"></label>
                  <input type="text" id="ratings" name="ratings" value={product.ratings} onChange={handleChange2} placeholder="ratings"/>
                  <label htmlFor="reviews"></label>
                  <input type="text" id="reviews" name="reviews" value={product.reviews} onChange={handleChange2} placeholder="reviews"/>
                  <label htmlFor="prime"></label>
                  <input type="text" id="prime" name="prime" value={product.prime} onChange={handleChange2} placeholder="prime"/>
                  <label htmlFor="soldby"></label>
                  <input type="text" id="soldby" name="soldby" value={product.soldby} onChange={handleChange2} placeholder="soldby"/>
                  <label htmlFor="featured"></label>
                  <input type="text" id="featured" name="featured" value={product.featured} onChange={handleChange2} placeholder="featured"/>
                  <label htmlFor="add_product_to_database"></label>
                  <input type="submit" value='submit' className="btn"/>

            </form>
        <button type="button" onClick={() => updateProduct('product_id', product)}>Update Product</button>
        <button type="button" onClick={() => deleteProduct('product_id')}>Delete Product</button>
        
        </>
     );
    }
  }

  export default  AdminDashboard;
