



import express from 'express';
import { userRegister, userLogin, userOut, createBook, getAllBooks } from '../controllers/userRegister.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin )
router.get('/out', userOut)


router.post("/createbook", createBook);// for controllers -> userRegister
router.get("/getallbooks", getAllBooks);// for controllers -> userRegister

export default router;