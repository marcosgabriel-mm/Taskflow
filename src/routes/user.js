import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', UserController.createNewUser);
router.post('/login', UserController.login);

export default router;