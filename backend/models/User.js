import db from '../config/db.js';
import bcrypt from 'bcrypt';

const createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await db.query(query, [user.username, hashedPassword]);
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [result] = await db.query(query, [username]);
    return result[0];
};

export { createUser, findUserByUsername };
