import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import { createUser, findUserByUsername } from '../models/User.js';


export const addRowsIds = async (req, res) => {
    const rows = req.body; // Assuming 'rows' is an array of strings as you mentioned
    if (!rows || !Array.isArray(rows)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const updateQuery = "UPDATE idstofeature SET row_ids = ? WHERE id = ?";

    try {
        await Promise.all(rows.map(async (numbers, index) => {
            const id = index + 1; // Assuming idstofeature table IDs start from 1 and increment

            // Convert numbers string to array of integers
            const numbersArray = numbers.split(',').map(numStr => parseInt(numStr.trim()));

            // Execute the update query
            await db.query(updateQuery, [JSON.stringify(numbersArray), id]);
            // console.log(`Updated row with id from controllers/users: ${id}`);
        }));

        res.status(200).json({ message: "Data updated" });
    } catch (error) {
        console.error("Error updating rows:", error);
        res.status(500).json({ error: "Failed to update rows" });
    }
};

export const users_login_post = async (req, res) => {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged in successfully' });
};

export const users_register_post = async (req, res) => {
    try {
        await createUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const login = async (req, res) => {
//     try {
//         const user = await findUserByUsername(req.body.username);
//         if (!user || !await bcrypt.compare(req.body.password, user.password)) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// export { register, login };
