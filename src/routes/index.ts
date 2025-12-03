import { Router } from "express"
import { userRoutes } from "@/routes/user-routes"
import { sessionRoutes } from "./session-routes"

import { teamCreateRoutes } from "./team-routes/team-create-routes"
import { teamUpdateRoutes } from "./team-routes/team-update-routes"
import { teamListRoutes } from "./team-routes/team-list-routes"
import { teamDeleteRoutes } from "./team-routes/team-delete-routes"
import { teamMemberRoutes } from "./team-routes/team-member-routes"
import { teamMemberDeleteRoutes } from "./team-routes/team-member-delete-routes"
import { teamMemberListRoutes } from "./team-routes/team-member-list-routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/session", sessionRoutes)
routes.use("/team", teamCreateRoutes)
routes.use("/team", teamUpdateRoutes)
routes.use("/team", teamListRoutes)
routes.use("/team", teamDeleteRoutes)
routes.use("/team-member", teamMemberRoutes)
routes.use("/team-member", teamMemberDeleteRoutes)
routes.use("/team-member", teamMemberListRoutes)

export { routes }