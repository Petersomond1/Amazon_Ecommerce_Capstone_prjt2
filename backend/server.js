import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import session from 'express-session';

import db from './config/db.js';
import productsRouter from './routes/products.js';


// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ dest: 'uploads/' });

const app = express();
const api = process.env.API_URL;

// Middleware configurations
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    optionsSuccessStatus: 200
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secure-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if your website uses HTTPS
}));


// Route configurations
app.use('/api', productsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(5000, () => {
    console.log(api);
    console.log('Server started at http://localhost:5000');
});

