



import express from 'express';
import { userRegister, userLogin, userOut, createBook, getAllBooks, getAllBooksFromAllSellers } from '../controllers/userRegister.js';
//import { getAllBooksFromAllSellers } from '../controllers/userRegister.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin )
router.get('/out', userOut)


router.post("/createbook", createBook);// for controllers -> userRegister
router.get("/getallbooks", getAllBooks);// for controllers -> userRegister

router.get('/the-seller/:seller', getAllBooks); 
router.get('/display-all-books', getAllBooksFromAllSellers)

export default router;