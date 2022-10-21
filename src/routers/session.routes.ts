import { Router } from "express";
import userLoginController from "../controllers/users/userLogin.controller";

const sessionRouter = () => {
    const router = Router()
    
    router.post("", userLoginController)

    return router
}


export default sessionRouter