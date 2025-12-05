import { Router } from "express"
import { TaskFilterPriorityController } from "@/controllers/task/task-filter-priority-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskFilterPriorityRoutes = Router()
const taskFilterPriorityController = new TaskFilterPriorityController()

taskFilterPriorityRoutes.get(
  "/:userId",
  ensureAuthenticated,
  verifyUserAuthorization(["admin", "member"]),
  taskFilterPriorityController.filter
)

export { taskFilterPriorityRoutes }