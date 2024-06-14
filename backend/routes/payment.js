import express from 'express';
const router = express.Router();



router.route('/api/payment')
    .get((req, res) => {
        res.json({message: 'Payment completed'});
    });

router.route('/api/checkout')
    .get((req, res) => {
        const { cart, total } = req.body;
        res.json({cart: cart, total: total, localStorage: true, message: 'Checkout completed'});
    });

export default router;