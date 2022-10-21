import { Router } from "express"
import categoryCreateController from "../controllers/categories/categotyCreate.controller"
import listCategoriesController from "../controllers/categories/listCategories.controller"
import listPropertiesByCategotyController from "../controllers/categories/listPropertiesByCategoty.controller"
import userAuthMiddleware from "../middlewares/userAuth.middleware"

const categoryRouter = () => {
    const router = Router()

    router.post("", userAuthMiddleware, categoryCreateController)
    router.get("", listCategoriesController)
    router.get("/:id/properties", listPropertiesByCategotyController)

    return router
}

export default categoryRouter