import HttpError from "../errors/HttpError.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new HttpError("Token não fornecido!", 401);
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = decoded;
        next();
    } catch (error) {
        throw new HttpError("Token invalido!", 401);
    }

}

export default authenticate;