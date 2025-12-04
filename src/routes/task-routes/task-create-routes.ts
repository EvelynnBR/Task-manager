import { Router } from "express"
import { TaskCreateController } from "@/controllers/task/task-create-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskCreateRoutes = Router()
const taskCreateController = new TaskCreateController()

taskCreateRoutes.post(
  "/:id/add-task",
  ensureAuthenticated,
  verifyUserAuthorization(["member", "admin"]),
  taskCreateController.create
)

export { taskCreateRoutes }