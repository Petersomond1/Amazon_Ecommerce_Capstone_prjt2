import express from 'express';
const router = express.Router();
import { addRowsIds } from '../controllers/users.js';


router.post('/row_ids',addRowsIds);


export default router;