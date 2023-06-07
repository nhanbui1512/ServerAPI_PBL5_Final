import express from "express";
import userController from "../controllers/userController"
import warningController from "../controllers/warningController";
import isLoginMiddleWare from "../services/JwtService";


const homeController = require('../controllers/homeController')
const userRoute = require('./userRoute')
const userMiddleware = require('../middlewares/userMiddleware')

let router = express.Router();

let initWebRoutes = (app) => {


    router.post('/api/login', userController.handleLogin)
    router.get('/register',homeController.register)
    router.post('/api/sendwarning', isLoginMiddleWare, warningController.createWarning)
    router.get('/api/getwarningbytime',userMiddleware,warningController.getWarningByTime)
    router.get('/',homeController.index)

    
    
    app.use('/user',userMiddleware,userRoute)
    return app.use("/", router);
}

export default initWebRoutes