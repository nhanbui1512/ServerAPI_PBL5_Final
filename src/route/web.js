import express from "express";
import userController from "../controllers/userController"
import warningController from "../controllers/warningController";
import isLoginMiddleWare from "../services/JwtService";

let router = express.Router();

let initWebRoutes = (app) => {


    router.post('/api/login', userController.handleLogin)
    router.post('/api/sendwarning', isLoginMiddleWare, warningController.createWarning)

    return app.use("/", router);
}

export default initWebRoutes