import db from '../config/db.js';

export function createProduct(req) {
    return {
        id: req.body.product.id,
        name: req.body.product.name,
        description: req.body.product.description,
        price: req.body.product.price,
        sale_price: req.body.product.sale_price,
        cart: req.body.product.cart,
        quantity_in_stock: req.body.product.quantity_in_stock,
        image: req.body.product.image,
        video_image: req.body.product.video_image,
        category: req.body.product.category,
        type: req.body.product.type,
        ratings: req.body.product.ratings,
        reviews: req.body.product.reviews,
        prime: req.body.product.prime,
        soldby: req.body.product.soldby,
        featured: req.body.product.featured,
    };
}

export const isProductInCart = async (id) => {
    const query = 'SELECT * FROM cart WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows.length > 0;
};

export const calculateTotal = async () => {
  const query = 'SELECT SUM(price * quantity_in_stock) AS total FROM cart';
  const [rows] = await db.query(query);
  return rows[0].total;
};