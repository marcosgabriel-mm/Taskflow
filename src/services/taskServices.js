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

    static async getAllTasks(idUser) {

        try {
            const tasks = await TaskRepository.findAll(idUser);
            if (tasks.length === 0) {
                throw new HttpError("Nenhuma tarefa encontrada!", 404);
            }

            return tasks;

        } catch (error) {
            throw error;
        }

    }

    static async getOneTaskFromUser(id, idUser) {
        try {
            
            const task = await TaskRepository.FindById(id, idUser);
            if (!task) {
                throw new HttpError("Não foi possivel encontrar a tarefa", 404);
            }

            return task;

        } catch (error) {
            throw error;
        }
    }

    static async deleteOneTask(id, idUser) {

        const transaction = await Database.iniciliazeTransaction();

        try {
            const task = await TaskRepository.destroy(id, idUser, transaction);
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

    static async updateOneTask(id, idUser, data) {

        const transaction = await Database.iniciliazeTransaction();

        try {  
            const task = await TaskRepository.update(id, idUser, data, transaction);
            if (task[0] === 0) {
                throw new HttpError("Não foi possivel atualizar a tarefa", 404);
            }

            await transaction.commit();
            return TaskRepository.FindById(id, idUser);

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }
}