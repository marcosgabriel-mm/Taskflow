import TaskService from "../services/taskServices.js";

export default class TaskController {

    static async createTask(req, res, next) {

        try {
            const response = await TaskService.createNewTask(req.body);
            
            return res.status(201).json({
                id: response.id,
                title: response.title,
                description: response.description,
                status: response.status,
                dueDate: response.dueDate
            });
            
        } catch (error) {
            next(error);
        }

    }

    static async getTasks(req, res, next) {

        try {
            const response = await TaskService.getAllTasks();
            return res.status(200).json(response);

        } catch (error) {
            next(error);
        }

    }

    static async getTask(req, res, next) {
        
        try {
            const response = await TaskService.getOneTask(req.params.id);
            return res.status(200).json({
                id: response.id,
                title: response.title,
                description: response.description,
                status: response.status,
                dueDate: response.dueDate
            });

        } catch (error) {
            next(error);
        }
    }

    static async editTask(req, res, next) {

        try {
            const response = await TaskService.updateOneTask(req.params.id, req.body);
            return res.status(200).json({
                id: response.id,
                title: response.title,
                description: response.description,
                status: response.status,
                dueDate: response.dueDate
            });

        } catch (error) {
            next(error);
        }

    }

    static async deleteTask(req, res, next) {

        try {
            await TaskService.deleteOneTask(req.params.id);
            return res.status(200).json({ message: "Tarefa deletada com sucesso!" });

        } catch (error) {
            next(error);
        }

    }

}