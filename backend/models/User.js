// User.js
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const createUser = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const query = 'INSERT INTO users (name, email, passwordHash, street, apartment, city, zip, country, phone, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        console.log('Executing query:', query, [user.name, user.email, hashedPassword, user.street, user.apartment, user.city, user.zip, user.country, user.phone, user.isAdmin]);
        await db.query(query, [user.name, user.email, hashedPassword, user.street, user.apartment, user.city, user.zip, user.country, user.phone, user.isAdmin]);
        console.log('User data:', user);
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [result] = await db.query(query, [username]);
    return result[0];
};

export { createUser, findUserByUsername };
