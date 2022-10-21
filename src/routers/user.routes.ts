import { userCreateSchema } from './../middlewares/userCreate.middleware';
import { Router } from "express";

import userCreateController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";
import userPatchController from '../controllers/users/userPatch.controller';

import userAuthMiddleware from '../middlewares/userAuth.middleware';
import userCreateValidationMiddleware from "../middlewares/userCreate.middleware";
import userDeleteController from '../controllers/users/userDelete.controller';


const userRouter = () => {
    const router = Router()
    
    router.get("", userAuthMiddleware, userListController)
    router.post("", userCreateValidationMiddleware(userCreateSchema), userCreateController)
    router.patch("/:id", userAuthMiddleware, userPatchController)
    router.delete("/:id", userAuthMiddleware, userDeleteController)

    return router
}


export default userRouter