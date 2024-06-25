import express from 'express';
import { add_to_cart, get_cart, insert_into_cart, get_everything_from_cart, update_quantity_in_cart, delete_from_cart, update_cart_from_order, update_product_quantity_in_cart, updates_status_of_product_in_cart } from '../controllers/cart.js';

const router = express.Router();

// Add to cart route
router.post('/add_to_cart/:id', add_to_cart);

router.route('/api/cart')
    .post(insert_into_cart)
    .get(get_cart);

router.route('/api/cart/:id')
    .get(get_everything_from_cart)
    .put(update_quantity_in_cart)
    .delete(delete_from_cart)
    .post(update_cart_from_order);

router.route('/api/update_quantity_in_cart')
    .put(update_product_quantity_in_cart);

router.post('/api/cart/:id/order', updates_status_of_product_in_cart);

export default router;