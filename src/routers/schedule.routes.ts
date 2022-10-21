import { Router } from "express"
import listSchedulesByPropertyController from "../controllers/schedules/listSchedulesByProperty.controller"
import scheduleCreateController from "../controllers/schedules/scheduleCreate.controller"
import userAuthMiddleware from "../middlewares/userAuth.middleware"

const scheduleRouter = () => {
    const router = Router()

    router.post("", userAuthMiddleware, scheduleCreateController)
    router.get("/properties/:id", userAuthMiddleware, listSchedulesByPropertyController)

    return router
}

export default scheduleRouter