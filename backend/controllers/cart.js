import { createProduct, isProductInCart, calculateTotal } from '../utils/commonfunctions.js';
import db from '../config/db.js';

// Get shopping cart
export const get_cart = async (req, res) => {
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

export const add_to_cart = async (req, res) => {
    try {
        const product = createProduct(req);
        
        if (!product.id || !product.name || !product.price) {
            throw new Error("Missing required product information");
        }
        
        const isProductAlreadyInCart = await isProductInCart(product.id);

        if (isProductAlreadyInCart) {
            const query = `
                UPDATE cart 
                SET 
                    name = ?,
                    description = ?,
                    price = ?,
                    quantity_in_stock = quantity_in_stock + 1,
                    image = ?,
                    video_image = ?,
                    category = ?,
                    type = ?,
                    ratings = ?,
                    reviews = ?,
                    prime = ?,
                    soldby = ?,
                    featured = ?
                WHERE id = ?`;
            await db.query(query, [
                product.name,
                product.description,
                product.price,
                product.image,
                product.video_image,
                product.category,
                product.type,
                product.ratings,
                product.reviews,
                product.prime,
                product.soldby,
                product.featured,
                product.id
            ]);
        } else {
            const price = product.sale_price || product.price;
            const quantityInStock = product.quantity_in_stock ? product.quantity_in_stock : 1;

            const query = `
                INSERT INTO cart 
                (id, name, description, price, quantity_in_stock, image, video_image, category, type, ratings, reviews, prime, soldby, featured) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await db.query(query, [
                product.id,
                product.name,
                product.description,
                price,
                quantityInStock,
                product.image,
                product.video_image,
                product.category,
                product.type,
                product.ratings,
                product.reviews,
                product.prime,
                product.soldby,
                product.featured
            ]);
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
        const quantity_InStock = req.body.quantity_in_stock;
        const cart = req.session.cart || [];
        const existingProductIndex = cart.findIndex(p => p.id === id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity_in_stock += quantity_InStock;
        } else {
            const product = createProduct(req);
            cart.push({ ...product, quantity_in_stock: quantity_InStock });
        }

        req.session.cart = cart;
        const total = await calculateTotal(cart);
        res.json({ cart: cart, total: total });
    } catch (error) {
        console.error("An error occurred while inserting into cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const update_quantity = async (req, res) => {
    const { id } = req.params;
    const { newQuantity } = req.body;
  
    if (newQuantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }
  
    try {
      await db.query('UPDATE cart SET quantity_in_stock = ? WHERE id = ?', [newQuantity, id]);
  
      const [cart] = await db.query('SELECT * FROM cart');
      const total = cart.reduce((sum, product) => sum + (product.price * product.quantity_in_stock), 0);
  
      res.status(200).json({ cart, total });
    } catch (error) {
      res.status(500).json({ message: 'Error updating quantity', error });
    }
  };

// yes for handleInc and handleDec
export const updateQuantityInCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { newQuantity } = req.body;
        const validQuantity = Number(newQuantity);

        if (isNaN(validQuantity) || validQuantity < 1) {
            return res.status(400).json({ message: 'Quantity must be a number and at least 1' });
        }

        const updateQuery = `
            UPDATE cart
            SET quantity_in_stock = ?
            WHERE id = ?
        `;
        await db.query(updateQuery, [validQuantity, id]);

        const getCartQuery = 'SELECT * FROM cart';
        const [cart] = await db.query(getCartQuery);

        const total = calculateTotal(cart);

        return res.status(200).json({ cart, total });
    } catch (error) {
        console.error('Error updating quantity in cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




export const update_quantity_in_cart = async (req, res) => {
    // try {
    //   const { id } = req.params;
    //   const { quantity_in_stock } = req.body;
  
    //   const query = 'UPDATE cart SET quantity_in_stock = ? WHERE id = ?';
    //   await db.query(query, [quantity_in_stock, id]);
  
    //   const total = await calculateTotal();
    //   res.json({ id: id, quantity_in_stock: quantity_in_stock, total: total });
    // } catch (error) {
    //   console.error('Error updating quantity in cart:', error);
    //   res.status(500).send('Internal Server Error');
    // }
  };

export const delete_from_cart = async (req, res) => {
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



export const get_everything_from_cart = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const query = 'SELECT * FROM cart WHERE id = ?';
    //     const [result] = await db.query(query, [id]);
    //     res.json(result);
    // } catch (error) {
    //     console.error('An error occurred while fetching the cart item:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
};

export const fetch_cart_and_total = async (req, res) => {
    // try {
    //     const cart = await db.query('SELECT * FROM cart');
    //     const total = await calculateTotal();
    //     res.json({ cart: cart, total: total });
    // } catch (error) {
    //     console.error('Error fetching cart and total:', error);
    //     res.status(500).send('Internal Server Error');
    // }
};





export const remove_product = async (req, res) => {
    // try {
    //     const id = req.body.id;
    //     const cart = req.session.cart;
    //     for (let i = 0; i < cart.length; i++) {
    //         if (cart[i].id === id) {
    //             cart.splice(i, 1);
    //             break;
    //         }
    //     }
    //     req.session.cart = cart;
    //     const total = await calculateTotal(cart);
    //     res.json({ cart: cart, total: total });
    // } catch (error) {
    //     console.error("An error occurred while removing product from cart:", error);
    //     res.status(500).json({ error: "Internal server error" });
    // }
};
export const remove_from_cart = async (req, res) => {
    // try {
    //     const { id } = req.params;

    //     const query = 'DELETE FROM cart WHERE id = ?';
    //     await db.query(query, [id]);

    //     const total = await calculateTotal();
    //     res.json({ id: id, total: total });
    // } catch (error) {
    //     console.error('Error removing item from cart:', error);
    //     res.status(500).send('Internal Server Error');
    // }
};


export const update_cart_from_order = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
    //     const [result] = await db.query(query, [id]);
    //     res.json(result);
    // } catch (error) {
    //     console.error('An error occurred while updating the cart from order:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
};

export const update_product_quantity_in_cart = async (req, res) => {
    // try {
    //     const { id, quantity_in_stock } = req.body;
    //     const query = 'UPDATE cart SET quantity_in_stock = ? WHERE id = ?';
    //     const [result] = await db.query(query, [quantity_in_stock, id]);
    //     res.json({ success: true });
    // } catch (error) {
    //     console.error('An error occurred while updating product quantity in cart:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
};

export const updates_status_of_product_in_cart = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const query = 'UPDATE cart SET status = "ordered" WHERE id = ?';
    //     const [result] = await db.query(query, [id]);
    //     res.json(result);
    // } catch (error) {
    //     console.error('An error occurred while updating the status of the product in the cart:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
};
