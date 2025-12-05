import { Router } from "express"
import { TaskPriorityController } from "@/controllers/task/task-priority-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskPriorityRoutes = Router()
const taskPriorityController = new TaskPriorityController()

taskPriorityRoutes.patch(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin", "member"]),
  taskPriorityController.priority
)

export { taskPriorityRoutes }