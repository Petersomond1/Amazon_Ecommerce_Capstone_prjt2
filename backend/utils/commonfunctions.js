import db from '../config/db.js';

export const createProduct = (req) => {
  const product = req.body.product || req.body;
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    sale_price: product.sale_price,
    quantity_in_stock: product.quantity_in_stock,
    image: product.image,
    video_image: product.video_image,
    category: product.category,
    type: product.type,
    ratings: product.ratings,
    reviews: product.reviews,
    prime: product.prime,
    soldby: product.soldby,
    featured: product.featured
  };
};

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


// const addProductToCart = () => {
//   const product = {
//     id: '123',
//     name: 'Product Name',
//     description: 'Product Description',
//     price: 19.99,
//     sale_price: 15.99,
//     quantity_in_stock: 1,
//     image: 'path/to/image',
//     video_image: 'path/to/video_image',
//     category: 'Category',
//     type: 'Type',
//     ratings: 4.5,
//     reviews: 10,
//     prime: true,
//     soldby: 'Seller Name',
//     featured: false
//   };

//   addToCart(product);