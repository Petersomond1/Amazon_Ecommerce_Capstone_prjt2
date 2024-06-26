import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import db from './config/db.js';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import ordersRouter from './routes/orders.js';
import usersRouter from './routes/users.js';
import paymentRouter from './routes/payment.js';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const api = process.env.API_URL;

// Middleware configurations
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secure-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if your website uses HTTPS
}));

// Middleware to set Content-Type for API responses
// const setJsonContentType = (req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     next();
// };

// app.use('/api', setJsonContentType);

// Middleware to set Content-Type header for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Route configurations
app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/api', ordersRouter);
app.use('/api', usersRouter);
app.use('/api', paymentRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});


// Start the server
app.listen(5000, () => {
    console.log(api);
    console.log('Server started at http://localhost:5000');
});