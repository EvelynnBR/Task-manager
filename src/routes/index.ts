import { Router } from "express"
import { userRoutes } from "@/routes/user-routes"
import { sessionRoutes } from "./session-routes"

import { teamRoutes } from "./team-routes/team-create-routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/session", sessionRoutes)
routes.use("/create-team", teamRoutes)

export { routes }




