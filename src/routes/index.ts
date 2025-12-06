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
import { taskCreateRoutes } from "./task-routes/task-create-routes"
import { taskListRoutes } from "./task-routes/task-list-routes"
import { taskUpdateRoutes } from "./task-routes/task-update-routes"
import { taskDeleteRoutes } from "./task-routes/task-delete-routes"
import { taskStatusRoutes } from "./task-routes/task-status-routes"
import { taskFilterStatusRoutes } from "./task-routes/task-filter-status-routes"
import { taskPriorityRoutes } from "./task-routes/task-priority-routes"
import { taskFilterPriorityRoutes } from "./task-routes/task-filter-priority-routes"
import { taskAssignUserRoutes } from "./task-routes/task-assign-user-routes"

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

routes.use("/task", taskCreateRoutes)
routes.use("/task/list", taskListRoutes)
routes.use("/task/update", taskUpdateRoutes)
routes.use("/task/delete", taskDeleteRoutes)
routes.use("/task/status", taskStatusRoutes)
routes.use("/task/status/filter", taskFilterStatusRoutes)
routes.use("/task/priority", taskPriorityRoutes)
routes.use("/task/priority/filter", taskFilterPriorityRoutes)
routes.use("/task/assign", taskAssignUserRoutes)


export { routes }