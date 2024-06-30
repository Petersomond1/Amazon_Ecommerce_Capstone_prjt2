import express from 'express';
import {
    get_cart,
    add_to_cart,
    updateQuantityInCart,
    delete_from_cart,


    insert_into_cart,
    update_quantity,
    get_everything_from_cart,
    update_cart_from_order,
    // update_quantity_in_cart,
   
    update_product_quantity_in_cart,
    updates_status_of_product_in_cart
} from '../controllers/cart.js';

const router = express.Router();

// Get shopping cart route
router.get('/cart', get_cart);

// Add to cart route
router.post('/cart/add_to_cart', add_to_cart);

// Update quantity in cart route
router.put('/cart/update_quantity/:id', updateQuantityInCart);

// Delete from cart route
router.delete('/cart/remove/:id', delete_from_cart);



router.post('/cart', insert_into_cart)
router.put('/cart/:id', update_quantity);
router.get('/cart/:id', get_everything_from_cart);
// router.put('/cart/:id', update_quantity_in_cart);
router.post('/cart/:id', update_cart_from_order);
router.put('/update_quantity_in_cart', update_product_quantity_in_cart);
router.post('/cart/:id/order', updates_status_of_product_in_cart);

export default router;
