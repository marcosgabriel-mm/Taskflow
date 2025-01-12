import UserService from "../services/userService.js";

export default class UserController {

    static async createNewUser(req, res, next) {
        try {
            const user = await UserService.createNewUser(req.body);
            return res.status(201).json({
                name: user.name,
                email: user.email,
            });
        
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const token = await UserService.login(req.body);
            return res.status(200).json({
                token: token
            });
        
        } catch (error) {
            next(error);
        }
    }

}