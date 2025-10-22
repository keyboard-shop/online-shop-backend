



import express from 'express';
import { userRegister, userLogin, userOut, createBook, getAllBooks, getAllBooksFromAllSellers } from '../controllers/userRegister.js';

import { getPersonalPage } from '../controllers/userRegister.js';// works
import verifyToken from '../middlewares/verifyToken.js';//works

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin )
router.get('/out', userOut)


router.post("/createbook", createBook);// for controllers -> userRegister
router.get("/getallbooks", getAllBooks);// for controllers -> userRegister

router.get('/the-seller/:seller', getAllBooks); 
router.get('/display-all-books', getAllBooksFromAllSellers)// works

router.get('/personal-page', verifyToken, getPersonalPage)// it works



export default router;