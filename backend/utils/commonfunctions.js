import db from '../config/db.js';

export async function calculateTotal() {
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

export function createProduct(req) {
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
export async function isProductInCart(id) {
    const query = 'SELECT * FROM cart WHERE products_ids = ?';
    const result = await db.query(query, [id]);
    const rows = Array.isArray(result) ? result : [result];
    return rows.length > 0;
}

