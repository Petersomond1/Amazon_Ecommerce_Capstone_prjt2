import express from 'express';
const router = express.Router();
import { get_all_orders, place_order } from '../controllers/order.js';


router.route('/api/orders')
    .get(get_all_orders);

router.post('/api/place_order', place_order);

export default router;