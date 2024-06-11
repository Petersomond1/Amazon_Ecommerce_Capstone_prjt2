import React, { useContext } from 'react';
import { CartContext } from './CartContext.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CheckoutToShipping() {
    const { cart, total } = useContext(CartContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
    
        try {
            const response = await axios.post(`http://localhost:5000/api/place_order`, {
                cart: cart,
                total: (total + 10).toFixed(0),
                name: form.elements.name.value,
                email: form.elements.email.value,
                shippingAddress: form.elements.shippingAddress.value,
                city: form.elements.city.value,
                country: form.elements.country.value,
                phone: form.elements.phone.value
            });
            console.log(response.data);
            console.log ('cart', cart, 'total', total);
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <>
    
   

   <div className='mx-auto container'>
   <form id='checkout-form' method='post' action='/api/place_order' onSubmit={handleSubmit} >
    <div>
    <label htmlFor='name'>Name</label>
    <input type='text' id='checkout-name' name='name' placeholder='name' required />
    </div>
    <div>
    <label htmlFor='email'>Email</label>
    <input type='email' id='checkout-email' name='email' placeholder='email' required />
    </div>
    <div>
    <label htmlFor='shippingAddress'>shippingAddress</label>
    <input type='text' id='checkout-shippingAddress' name='shippingAddress' placeholder='shippingAddress' required />
    </div>
    <div>
    <label htmlFor='city'>city</label>
    <input type='text' id='checkout-city' name='city' placeholder='city' required />
    </div>
    <div>
    <label htmlFor='country'>country</label>
    <input type='text' id='checkout-country' name='country' placeholder='country' required />
    </div>
    <div>
    <label htmlFor='phone'>Phone</label>
    <input type='tel' id='checkout-phone' name='phone' placeholder='phone' required />
    </div>
    <div>
        <p>Items in cart: {cart.length}, Total Cost: {total}</p>
       
       <Link to="/api/Payment">
        <input type='submit' className='button' id='checkout-btn' name='checkout-btn' value='submit button' />
        </Link>
    </div>
    </form>
   </div>
   </>
  )
}

export default CheckoutToShipping;