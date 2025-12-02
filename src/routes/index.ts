import { Router } from "express"
import { userRoutes } from "@/routes/user-routes"
import { sessionRoutes } from "./session-routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/session", sessionRoutes)

export { routes }




