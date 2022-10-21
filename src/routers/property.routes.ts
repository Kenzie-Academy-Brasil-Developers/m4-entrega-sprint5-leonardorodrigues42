import { Router } from "express"
import listPropertiesController from "../controllers/properties/listProperties.controller"
import propertyCreateController from "../controllers/properties/propertyCreate.controller"
import userAuthMiddleware from "../middlewares/userAuth.middleware"

const propertyRouter = () => {
    const router = Router()

    router.post("", userAuthMiddleware, propertyCreateController)
    router.get("", listPropertiesController)
    
    return router
}

export default propertyRouter