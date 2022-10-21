import "reflect-metadata"
import "express-async-errors"
import express from "express"
import handleErrorMiddleware from "./middlewares/handleError.middleware"
import appRouter from "./routers"


const app = express()
app.use(express.json())
appRouter(app)
app.use(handleErrorMiddleware)


export default app