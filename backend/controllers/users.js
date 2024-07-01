// users.js
import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser } from '../models/User.js';

export const addRowsIds = async (req, res) => {
    const rows = req.body;
    if (!rows || !Array.isArray(rows)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const updateQuery = "UPDATE idstofeature SET row_ids = ? WHERE id = ?";

    try {
        await Promise.all(rows.map(async (numbers, index) => {
            const id = index + 1;
            const numbersArray = numbers.split(',').map(numStr => parseInt(numStr.trim()));
            await db.query(updateQuery, [JSON.stringify(numbersArray), id]);
        }));
        res.status(200).json({ message: "Data updated" });
    } catch (error) {
        console.error("Error updating rows:", error);
        res.status(500).json({ error: "Failed to update rows" });
    }
};

export const users_login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login data:', { email, password }); // Log incoming data
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Database query result:', rows); // Log database query result

        if (rows.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Error during login:', error); // Log detailed error
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const users_register_post = async (req, res) => {
    try {
        console.log('Received registration data:', req.body); // Log incoming data
        await createUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
