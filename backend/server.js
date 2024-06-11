import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import productsRouter from './routes/products.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import session from 'express-session';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ dest: 'uploads/' });
const app = express();

const api = process.env.API_URL;
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    optionsSuccessStatus: 200
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secure-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if your website uses HTTPS
}));
app.use(productsRouter);
app.use(bodyParser.json());


// Create the database connection 
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'amazon_ecommerce_mysqldb'
});

// Connect to the database
db.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

app.use(`${api}/products`, productsRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5000, () => {
    console.log(api);
    console.log('Server started at http://localhost:5000'); // shows at the server/console
});