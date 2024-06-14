import express from 'express';
import db from '../config/db.js'
import multer from 'multer';
import { product } from '../controllers/productsController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/api/products', product)

    //From clientside to get products from database
    router.get('/api/products/:id', (req, res) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        db.query(sql, req.params.id, (error, result) => {
          if (error) throw error;
          res.json(result);
        });
      });

// GET allproducts of useeffect endpoint1
router.get('/api/allproducts', (req, res) => {
    const query = 'SELECT * FROM products';
    console.log('allproducts', query)

    db.query(query, (error, results) => {
        if (error) {
          console.error('Error querying database:', error);
          res.status(500).json({ error: 'Error querying database' });
          return;
        }
        res.json(results);
      });
});

// GET all products endpoint1
router.get('/', (req, res) => {
    db.query("SELECT * FROM products", (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ error: 'Error querying database' });
            return;
        }
        res.json(results);
    });
});


// PUT /api/products/:id
router.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const quantity_InStock = req.body.quantity_InStock;
    const cart = req.session.cart || [];
    const existingProductIndex = cart.findIndex(p => p.id === id);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity_InStock += quantity_InStock;
    }
    req.session.cart = cart;
    const total = calculateTotal(cart, req);
    res.json({cart: cart, total: total});
});

// DELETE /api/remove_product
router.delete('/api/remove_product', (req, res) => {
    const id = req.body.id;
    const cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1);
            break;
        }
    }
    req.session.cart = cart;
    const total = calculateTotal(cart, req);
    res.json({cart: cart, total: total});
});

//Insert product entered at admindashboard into database
router.post('/api/products', (req, res) => {
    const product = req.body;
    const query = 'INSERT INTO products SET ?';
    db.query(query, product, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

//From admindashboard to database
router.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, id, (error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

////From admindashboard to database
router.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const query = 'UPDATE products SET ? WHERE id = ?';
    db.query(query, [product, id], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
})

 export default router;




