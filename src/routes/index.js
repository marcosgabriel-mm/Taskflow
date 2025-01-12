import express from 'express';
import TaskRouter from './tasks.js';
import UserRouter from './user.js';
import AuthJWT from "../middlewares/jwtAuthenticator.js"

const router = express.Router();
router.use('/task', AuthJWT, TaskRouter);
router.use('/user', UserRouter);

export default router;