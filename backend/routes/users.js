import express from 'express';
import { addRowsIds } from '../controllers/users.js';
import { users_login_post } from '../controllers/users.js';
import authenticateToken from '../middleware/auth.js';
import { users_register_post } from '../controllers/users.js';


const router = express.Router();


router.post('/row_ids',addRowsIds);

router.post('users/register', users_register_post);

router.post('/users/login', users_login_post);

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

router.post('/api/users/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});


export default router;
