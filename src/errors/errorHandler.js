import HttpError from "./HttpError.js";

const errorHandler = (error, req, res, next) => {
    console.log(error);

    if (error instanceof HttpError) {
        return res.status(400).json({
            status: error.status,
            message: error.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
}

export default errorHandler;