// Fix for handleChange and handleSubmit

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

  const [formData, setFormData] = useState(Array(6).fill('')); // Initialize with 6 empty strings for 6 rows

  const handleChange = (index) => (e) => {
    const newData = [...formData];
    newData[index] = e.target.value;
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idsData = formData.map((row, index) => ({
      id: index + 1,
      row_ids: row
    }));

    try {
      const response = await axios.post('http://localhost:5000/api/row_ids', { rows: idsData });
      console.log('Successfully updated rows:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
     
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
        {formData.map((_, index) => (
          <div key={index}>
            <label>{`Row ${index + 1} IDs:`}</label>
            <input
              name={`row${index + 1}_ids`}
              value={formData[index]}
              onChange={handleChange(index)}
              placeholder={`Comma separated numbers for row ${index + 1}`}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
<br />
<hr />
<br />
      <form onSubmit={add_product_to_database}>
               <input type="text" id="name" name="name" value={product.name} onChange={handleChange2} placeholder="name"/>
                <input type="text" id="description" name="description" value={product.description} onChange={handleChange2} placeholder="description"/>
                <input type="text" id="price" name="price" value={product.price || ''} onChange={handleChange2} placeholder="price"/>
                <input type="text" id="sale_price" name="sale_price" value={product.sale_price || ''} onChange={handleChange2} placeholder="sale_price"/>
                <input type="text" id="quantity_InStock" name="quantity_InStock" value={product.quantity_InStock} onChange={handleChange2} placeholder="quantity_InStock"/>
                <input type="text" id="image" name="image" value={product.image} onChange={handleChange2} placeholder="image"/>
                <input type="text" id="video_image" name="video_image" value={product.video_image} onChange={handleChange2} placeholder="video_image"/>
                <input type="text" id="category" name="category" value={product.category} onChange={handleChange2} placeholder="category"/>
                <input type="text" id="type" name="type" value={product.type} onChange={handleChange2} placeholder="type"/>
                <input type="text" id="ratings" name="ratings" value={product.ratings} onChange={handleChange2} placeholder="ratings"/>
                <input type="text" id="reviews" name="reviews" value={product.reviews} onChange={handleChange2} placeholder="reviews"/>
                <input type="text" id="prime" name="prime" value={product.prime} onChange={handleChange2} placeholder="prime"/>
                <input type="text" id="soldby" name="soldby" value={product.soldby} onChange={handleChange2} placeholder="soldby"/>
                <input type="text" id="featured" name="featured" value={product.featured} onChange={handleChange2} placeholder="featured"/>
                <input type="submit" value='Submit' className="btn"/>
      </form>
      <button type="button" onClick={() => updateProduct('product_id', product)}>Update Product</button>
      <button type="button" onClick={() => deleteProduct('product_id')}>Delete Product</button>
    </>
  );
}

export default AdminDashboard;