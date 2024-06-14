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

export const name =  async (req, res) =>{
    
}
