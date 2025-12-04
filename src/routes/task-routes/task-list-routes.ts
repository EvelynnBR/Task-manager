import { Router } from "express"
import { TaskListController } from "@/controllers/task/task-list-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskListRoutes = Router()
const taskListController = new TaskListController()

taskListRoutes.get(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["member", "admin"]),
  taskListController.index
)

export { taskListRoutes }
