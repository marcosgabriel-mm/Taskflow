import User from "../models/user.js";

export default class UserRepository {

    static async create(data, transaction) {

        try {
            const user = await User.create(data, {transaction: transaction});
            return user;
        
        } catch (error) {
            throw error;
        }
    }
    
    static async findByEmail(email) {
        try {
            const user = await User.findOne({where: {email: email}});
            return user;
        } catch (error) {
            throw error;
        }
    }

}