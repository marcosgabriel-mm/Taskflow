import Task from "../models/task.js";

export default class TaskRepository {

    static async create(data, transaction) {

        try {
            const task = await Task.create(data, {transaction: transaction});
            return task;
        
        } catch (error) {
            throw error;
        }
    }

    static async findAll(idUser) {
        try {
            const tasks = await Task.findAll({where: {user_id: idUser}});
            return tasks;
        
        } catch (error) {
            throw error;
        }
    }

    static async FindById(id, idUser) {
        try {
            const task = await Task.findOne({where: {id: id, user_id: idUser}});
            return task;
        
        } catch (error) {
            throw error;
        }
    }

    static async update(id, idUser, data, transaction) {
        try {
            const task = await Task.update(data, {where: {id: id, user_id: idUser}, transaction: transaction});
            return task;
        
        } catch (error) {
            throw error;
        }
    }

    static async destroy(id, idUser, transaction) {
        try {
            const task = await Task.destroy({where: {id: id, user_id: idUser}, transaction: transaction});
            return task;
        
        } catch (error) {
            throw error;
        }
    }
}