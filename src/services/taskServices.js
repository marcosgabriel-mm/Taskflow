import TaskRepository from "../repositories/taskRepository.js";
import Database from "../config/db.js";
import HttpError from "../errors/HttpError.js";

export default class TaskService {

    static async createNewTask(data) {

        const transaction = await Database.iniciliazeTransaction();
        try {

            const task = await TaskRepository.create(data, transaction);
            if (!task) {
                throw new HttpError("Falha ao criar tarefa!", 400);
            }

            await transaction.commit();
            return task;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    static async getAllTasks() {

        try {
            const tasks = await TaskRepository.findAll();
            if (tasks.length === 0) {
                throw new HttpError("Nenhuma tarefa encontrada!", 404);
            }

            return tasks;

        } catch (error) {
            throw error;
        }

    }

    static async getOneTask(id) {
        try {
            
            const task = await TaskRepository.FindById(id);
            if (!task) {
                throw new HttpError("Não foi possivel encontrar a tarefa", 404);
            }

            return task;

        } catch (error) {
            throw error;
        }
    }

    static async deleteOneTask(id) {

        const transaction = await Database.iniciliazeTransaction();

        try {
            const task = await TaskRepository.destroy(id, transaction);
            if (task === 0) {
                throw new HttpError("Não foi possivel deletar a tarefa", 404);
            }

            await transaction.commit();
            return task;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    static async updateOneTask(id, data) {

        const transaction = await Database.iniciliazeTransaction();

        try {  
            const task = await TaskRepository.update(id, data, transaction);
            if (task[0] === 0) {
                throw new HttpError("Não foi possivel atualizar a tarefa", 404);
            }

            await transaction.commit();
            return TaskRepository.FindById(id);

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }
}