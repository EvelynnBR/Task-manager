import { Router } from "express"
import { TaskStatusController } from "@/controllers/task/task-status-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskStatusRoutes = Router()
const taskStatusController = new TaskStatusController()

taskStatusRoutes.patch(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin", "member"]),
  taskStatusController.status
)

export { taskStatusRoutes }