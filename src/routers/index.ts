import { Express } from "express"
import categoryRouter from "./category.routes"
import propertyRouter from "./property.routes"
import scheduleRouter from "./schedule.routes"
import sessionRouter from "./session.routes"
import userRouter from "./user.routes"

const appRouter = (app: Express) => {
    app.use("/users", userRouter())
    app.use("/login", sessionRouter())
    app.use("/categories", categoryRouter())
    app.use("/properties", propertyRouter())
    app.use("/schedules", scheduleRouter())
}

export default appRouter