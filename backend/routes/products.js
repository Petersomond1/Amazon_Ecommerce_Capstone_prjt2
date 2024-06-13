import express from 'express';
import db from '../config/db.js'
import multer from 'multer';
import { addRowsIds, product } from '../controllers/productsController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });



router.post('/row_ids',addRowsIds);
router.get('/api/products', product)
//Ids from Admindashboard now passing to database to get/select the products for feature/display


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

// GET endpoint1
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


// Helper function to create a product object
function createProduct(req) {
    return {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sale_price: req.body.sale_price,
        cart: req.body.cart,  //in cart
        quantity_InStock: req.body.quantity_InStock,
        image: req.body.image,
        video_image: req.body.video_image,
        category: req.body.category,
        type: req.body.type,
        ratings: req.body.ratings,
        reviews: req.body.reviews,
        prime: req.body.prime,
        soldby: req.body.soldby,
        featured: req.body.featured,
    };
}

// Check if a product is already in the cart in the database
async function isProductInCart(id) {
    const query = 'SELECT * FROM cart WHERE products_ids = ?';
    const result = await db.query(query, [id]);
    const rows = Array.isArray(result) ? result : [result];
    return rows.length > 0;
}

// Calculate the total price from the cart in the database
// async function calculateTotal() {
//     const query = 'SELECT SUM(price * quantity) as total FROM cart';
//     const [rows] = await db.query(query);
//     return rows[0].total;
// }

async function calculateTotal() {
    const query = 'SELECT SUM(total) as total FROM cart';
    const result = await new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
    return result[0].total;
}


// add_to_cart POST from AllProductsAndServices_Display to cart
router.post('/api/add_to_cart', async (req, res, next) => {
    const product = createProduct(req); 

    product.video_image = product.video_image || null;
    product.type = product.type || null;

    const isProductAlreadyInCart = await isProductInCart(product.id);

    if (isProductAlreadyInCart) {
        const query = 'UPDATE cart SET cart = cart + ? WHERE products_ids = ?';
        await db.query(query, [product.cart, product.id]);
    } else {
        const query = 'INSERT INTO cart (products_ids, cart, price) VALUES (?,?,?)';
        await db.query(query, [product.id, product.cart, product.sale_price || product.price]);
    }

    const total = await calculateTotal();

    res.json({product: product, total: total});
});


 
router.route('/api/cart')
    .post((req, res) => {
        const query = 'INSERT INTO cart SET ?';
        db.query(query, req.body, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    })
    .get((req, res) => {
        const cart = Array.isArray(req.session.cart) ? req.session.cart : [];
        const total = req.session.total;
        res.json({cart: cart, total: total, localStorage: true});
    });

router.route('/api/cart/:id')
    .get((req, res) => {
        const { id } = req.params;
        const query = 'SELECT * FROM cart WHERE id = ?';
        db.query(query, id, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    })
    .put((req, res) => {
        const { id } = req.params;
        const query = 'UPDATE cart SET ? WHERE id = ?';
        db.query(query, [req.body, id], (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    })
    .delete((req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM cart WHERE id = ?';
        db.query(query, id, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    })
    .post((req, res) => {
        const { id } = req.params;
        const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
        db.query(query, id, (error, result) => {
            if (error) throw error;
            res.json(result);
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

router.route('/api/orders')
    .get((req, res) => {
        const query = 'SELECT * FROM orders';
        db.query(query, (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    });

router.route('/api/update_quantity_in_cart')
    .put((req, res) => {
        const { id, cart } = req.body;
        const query = 'UPDATE products SET quantity_InStock =? WHERE id =?';
        db.query(query, [cart, id], (error, result) => {
            if (error) throw error;
            res.json({ success: true });
        });
    });

router.route('/api/payment')
    .get((req, res) => {
        res.json({message: 'Payment completed'});
    });

router.route('/api/checkout')
    .get((req, res) => {
        const { cart, total } = req.body;
        res.json({cart: cart, total: total, localStorage: true, message: 'Checkout completed'});
    });


// 5. Convert carts to orders
router.post('/api/cart/:id/order', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
    db.query(query, id, (error, result) => {
        if (error) throw error;
        const shippingCost = 10;
        // Here you can add additional steps like calculating shipping costs, applying discounts, and finalizing payment.
        res.json(result);
    });
});

router.post('/api/place_order', (req, res) => {
    const { cart, total, name, email, shippingAddress, city, country, phone } = req.body;
    const status = 'pending';
    const cost = total;
    const dateOrdered = new Date();

    const query = 'INSERT INTO orders (name, email, shippingAddress, city, country, phone, status, cost, dateOrdered) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, shippingAddress, city, country, phone, status, cost, dateOrdered], async (error, result) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ error: 'Error querying database' });
            return;
        }

        res.json({cart: cart, total: total, orderResult: result});
        console.log('orderResult', result);
    });
});



router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.get(`/*`, (req, res) => {
    res.send('Server is ready');
});

 export default router;




