import { createProduct, isProductInCart, calculateTotal } from '../utils/commonfunctions.js';
import db from '../config/db.js';



export const add_to_cart = async (req, res, next) => {
    // const product = createProduct(req); 
console.log("req.body", req.body)
    // product.video_image = product.video_image || null;
    // product.type = product.type || null;

    // const isProductAlreadyInCart = await isProductInCart(product.id);

    // if (isProductAlreadyInCart) {
    //     const query = 'UPDATE cart SET cart = cart + ? WHERE products_ids = ?';
    //     await db.query(query, [product.cart, product.id]);
    // } else {

    try {
        const product = req.body;
        const query = 'INSERT INTO cart (products_ids, cart, price) VALUES (?,?,?)';
        await db.query(query, [req.body.id, req.body.cart, req.body.sale_price || req.body.price]);
    res.json({product: product,});
    }
catch (error) {
        console.error("An error occurred while adding to cart:", error);
    }
    // const total = await calculateTotal();

}

export const insert_into_cart  = async (req, res, next) => {

        const query = 'INSERT INTO cart SET ?';
        db.query(query, req.body, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    
}

export const get_cart = async (req, res, next) => {
    const cart = Array.isArray(req.session.cart) ? req.session.cart : [];
    const total = req.session.total;
    res.json({cart: cart, total: total, localStorage: true});
}

export const get_everything_from_cart = async (req, res, next) => {
const { id } = req.params;
const query = 'SELECT * FROM cart WHERE id = ?';
db.query(query, id, (error, result) => {
    if (error) throw error;
    res.json(result);
})
};

export const update_quantity_in_cart = async (req, res, next) => {
    const { id } = req.params;
    const query = 'UPDATE cart SET ? WHERE id = ?';
    db.query(query, [req.body, id], (error, result) => {
        if (error) throw error;
        res.json(result);
    });
}

export const delete_from_cart = async (req, res, next) => {
    
        const { id } = req.params;
        const query = 'DELETE FROM cart WHERE id = ?';
        db.query(query, id, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    }

export const update_cart_from_order = async (req, res, next) => {
   
        const { id } = req.params;
        const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
        db.query(query, id, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    }

export const update_product_quantity_in_cart = async (req, res, next) => {

        const { id, cart } = req.body;
        const query = 'UPDATE products SET quantity_InStock =? WHERE id =?';
        db.query(query, [cart, id], (error, result) => {
            if (error) throw error;
            res.json({ success: true });
        });
    }

export const updates_status_of_product_in_cart = async (req, res, next) => {
        const { id } = req.params;
        const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
        db.query(query, id, (error, result) => {
            if (error) throw error;
            const shippingCost = 10;
            // Here you can add additional steps like calculating shipping costs, applying discounts, and finalizing payment.
            res.json(result);
        });
    }