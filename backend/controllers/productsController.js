import db from '../config/db.js'



export const product =  async (req, res) => {
    const ids = req.query.ids.split(',').map(Number);
    const placeholders = ids.map(() => '?').join(',');
    const query = `SELECT * FROM products WHERE id IN (${placeholders})`;
    db.query(query, ids, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
}

export const get_single_product =  async (req, res) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        db.query(sql, req.params.id, (error, result) => {
          if (error) throw error;
          res.json(result);
        });
      }

export const get_all_products_useeffect =  async (req, res) => {
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
    }

export const get_all_products =  async (req, res) => {
        db.query("SELECT * FROM products", (error, results) => {
            if (error) {
                console.error('Error querying database:', error);
                res.status(500).json({ error: 'Error querying database' });
                return;
            }
            res.json(results);
        });
    }

//unsure purpose
export const put_update_cart =  async (req, res) => {
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
    }

export const remove_product =  async (req, res) => {
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
    }


export const post_product_database =  async (req, res) => {
        const product = req.body;
        const query = 'INSERT INTO products SET ?';
        db.query(query, product, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    } 

export const delete_product_database =  async (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM products WHERE id = ?';
        db.query(query, id, (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    }

export const put_update_database =  async (req, res) => {
        const { id } = req.params;
        const product = req.body;
        const query = 'UPDATE products SET ? WHERE id = ?';
        db.query(query, [product, id], (error, result) => {
            if (error) throw error;
            res.json(result);
        });
    }

export const name =  async (req, res) =>{
    
}
