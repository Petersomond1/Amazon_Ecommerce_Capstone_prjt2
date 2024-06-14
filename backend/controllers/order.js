import db from '../config/db.js';

export const get_all_orders =  async (req, res) => {
    (req, res) => {
        const query = 'SELECT * FROM orders';
        db.query(query, (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    }
}

export const place_order =  async (req, res) => {
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
}