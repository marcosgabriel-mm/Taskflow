import Task from "../models/task.js";

export default class TaskRepository {

    static async create(data, transaction) {

        try {
            const task = await Task.create(data, {transaction: transaction});
            return task;
        
        } catch (error) {
            return error;
        }
    }

    static async findAll() {
        try {
            const tasks = await Task.findAll();
            return tasks;
        
        } catch (error) {
            return error;
        }
    }

    static async FindById(id) {
        try {
            const task = await Task.findByPk(id);
            return task;
        
        } catch (error) {
            return error;
        }
    }

    static async update(id, data, transaction) {
        try {
            const task = await Task.update(data, {where: {id: id}, transaction: transaction});
            return task;
        
        } catch (error) {
            return error;
        }
    }

    static async destroy(id, transaction) {
        try {
            const task = await Task.destroy({where: {id: id}, transaction: transaction});
            return task;
        
        } catch (error) {
            return error;
        }
    }
}