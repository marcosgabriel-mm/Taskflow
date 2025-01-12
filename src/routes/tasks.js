import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/', TaskController.getTasks);
router.post('/', TaskController.createTask);
router.get('/:id', TaskController.getTask);
router.put('/:id', TaskController.editTask);
router.delete('/:id', TaskController.deleteTask);

export default router;