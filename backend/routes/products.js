import express from 'express';
import db from '../config/db.js'
import multer from 'multer';
import { product, get_single_product, 
    get_all_products_useeffect, get_all_products, 
    post_product_database, remove_product,
    delete_product_database, put_update_database  
} from '../controllers/productsController.js';
// put_update_cart,  


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/products', product);

//From clientside to get products from database
router.get('/api/products/:id', get_single_product);

// GET allproducts of useeffect endpoint1
router.get('/api/allproducts', get_all_products_useeffect);

// GET all products endpoint1
router.get('/', get_all_products);


// // PUT /api/products/:id &  unsure purpose
// router.put('/api/products/:id', put_update_cart);

// DELETE /api/remove_product
router.delete('/api/remove_product', remove_product);

//Insert product entered at admindashboard into database
router.post('/api/products', post_product_database);

//From admindashboard to database
router.delete('/api/products/:id', delete_product_database);

////From admindashboard to database
router.put('/api/products/:id', put_update_database);

 export default router;




