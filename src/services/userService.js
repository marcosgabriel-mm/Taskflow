import UserRepository from "../repositories/userRepository.js";
import Database from "../config/db.js";
import bcrypt from "bcrypt";
import HttpError from "../errors/HttpError.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export default class UserService {

    static async createNewUser(data) {

        const transaction = await Database.iniciliazeTransaction();

        try {
            const user = await UserRepository.findByEmail(data.email);
            if (user) {
                throw new HttpError("Email já cadastrado!", 400);
            }

            const hash_password = await bcrypt.hash(data.password, 10);
            data.password = hash_password;

            const new_user = await UserRepository.create(data, transaction);
            
            await transaction.commit();
            return new_user;
        
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    static async login(data) {

        try {
            const user = await UserRepository.findByEmail(data.email);
            if (!user) {
                throw new HttpError("Email ou senha incorretos!", 400);
            }

            const match = await bcrypt.compare(data.password, user.password);
            if (!match) {
                throw new HttpError("Email ou senha incorretos!", 400);
            }

            return jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"});
        
        } catch (error) {
            throw error;
        }

    }

}