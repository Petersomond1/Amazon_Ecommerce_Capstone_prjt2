import db from '../config/db.js'



export const product = async (req, res) => {
    try {
        const que = "SELECT * from idstofeature;";

        const result = await db.query(que);
        // Parse the row_ids strings into arrays and then flatten them
        const RowIds = result[0].flatMap(row => row.row_ids);
        // console.log("RowIds in All row_ids @ /products: ", RowIds);
        const allRowIds = result[0]
            .flatMap(row => JSON.parse(row.row_ids));

        // console.log("All row_ids: ", allRowIds);
        
        // Construct the placeholders for the SQL query
        const placeholders = allRowIds.map(() => '?').join(',');
        // console.log("placeholders in All row_ids @ /products : ", placeholders);

        // Create the SQL query
const qu = `SELECT * FROM products WHERE id IN (${placeholders})`;

        // Use spread operator to pass the values
        const data = await db.query(qu, [...allRowIds]);
        res.status(200).json([data, RowIds]);
    } catch (error) {
        // console.log("the problem is here: ", error.message);
    }
}


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

export const get_single_product =  async (req, res) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        db.query(sql, req.params.id, (error, result) => {
          if (error) throw error;
          res.json(result);
        });
      }

export const get_all_products_useeffect =  async (req, res) => {
        const query = 'SELECT * FROM products';
        // console.log('allproducts', query)
    
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
