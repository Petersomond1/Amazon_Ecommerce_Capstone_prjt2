import mysql from 'mysql2/promise';

// Create the database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'THISisOUSSAMA12/*',
    database: process.env.DB_NAME || 'amazon_ecommerce_mysqldb'
});

// Test the database connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log("db connected");
        connection.release();
    } catch (err) {
        console.error("db did not connect", err);
    }
})();

export default db;