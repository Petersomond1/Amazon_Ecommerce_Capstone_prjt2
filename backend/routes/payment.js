import express from 'express';
import { payment, checkout } from '../controllers/payment.js';
const router = express.Router();



router.route('/api/payment')
    .get(payment);

router.route('/api/checkout')
    .get(checkout);

export default router;