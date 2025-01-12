import { Sequelize } from "sequelize";
import Task from "../models/task.js";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
class Database {

    #sequelize;
    async init() {

        this.#sequelize = new Sequelize({
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            logging: false
        });


        try {
            await this.#sequelize.authenticate();
        } catch (error) {
            throw error;
        }

        Task.init(this.#sequelize);
        User.init(this.#sequelize);

        Task.associate(this.#sequelize.models);
        User.associate(this.#sequelize.models);

        await this.#sequelize.sync({force: false});

    }

    async sequelize() { return this.#sequelize; }

    async iniciliazeTransaction() {
        return await this.#sequelize.transaction();
    }
}

export default new Database();