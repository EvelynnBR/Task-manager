import { Router } from "express"
import { TaskFilterStatusController } from "@/controllers/task/task-filter-status-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskFilterStatusRoutes = Router()
const taskFilterStatusController = new TaskFilterStatusController()

taskFilterStatusRoutes.get(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin", "member"]),
  taskFilterStatusController.filter
)

export { taskFilterStatusRoutes }