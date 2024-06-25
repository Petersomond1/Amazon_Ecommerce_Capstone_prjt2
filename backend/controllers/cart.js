import { createProduct, isProductInCart, calculateTotal } from '../utils/commonfunctions.js';
import db from '../config/db.js';

export const add_to_cart = async (req, res, next) => {
    try {
        const product = createProduct(req);
        const isProductAlreadyInCart = await isProductInCart(product.id);

        if (isProductAlreadyInCart) {
            const query = 'UPDATE cart SET quantity_in_stock = quantity_in_stock + 1 WHERE id = ?';
            await db.query(query, [product.id]);
        } else {
            const query = 'INSERT INTO cart (id, quantity_in_stock, price) VALUES (?, 1, ?)';
            await db.query(query, [product.id, product.sale_price || product.price]);
        }

        const total = await calculateTotal();
        res.json({ product: product, total: total });
    } catch (error) {
        console.error("An error occurred while adding to cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const insert_into_cart = async (req, res) => {
    try {
        const { id } = req.params;
        const quantity_InStock = req.body.quantity_InStock;
        const cart = req.session.cart || [];
        const existingProductIndex = cart.findIndex(p => p.id === id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity_InStock += quantity_InStock;
        }

        req.session.cart = cart;
        const total = calculateTotal(cart, req);
        res.json({ cart: cart, total: total });
    } catch (error) {
        console.error("An error occurred while inserting into cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const remove_product = async (req, res) => {
    try {
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
        res.json({ cart: cart, total: total });
    } catch (error) {
        console.error("An error occurred while removing product from cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const get_cart = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM cart';
        const [cartItems] = await db.query(query);
        const total = await calculateTotal();
        res.json({ cart: cartItems, total });
    } catch (error) {
        console.error('An error occurred while fetching the cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const get_everything_from_cart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM cart WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.json(result);
    } catch (error) {
        console.error('An error occurred while fetching the cart item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const update_quantity_in_cart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = 'UPDATE cart SET ? WHERE id = ?';
        const [result] = await db.query(query, [req.body, id]);
        res.json(result);
    } catch (error) {
        console.error('An error occurred while updating the cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const delete_from_cart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM cart WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.json(result);
    } catch (error) {
        console.error('An error occurred while deleting from the cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const update_cart_from_order = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.json(result);
    } catch (error) {
        console.error('An error occurred while updating the cart from order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const update_product_quantity_in_cart = async (req, res, next) => {
    try {
        const { id, cart } = req.body;
        const query = 'UPDATE products SET quantity_InStock = ? WHERE id = ?';
        const [result] = await db.query(query, [cart, id]);
        res.json({ success: true });
    } catch (error) {
        console.error('An error occurred while updating product quantity in cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updates_status_of_product_in_cart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
        const [result] = await db.query(query, [id]);
        res.json(result);
    } catch (error) {
        console.error('An error occurred while updating the status of the product in the cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
