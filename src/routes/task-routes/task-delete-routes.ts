import { Router } from "express"
import { TaskDeleteController } from "@/controllers/task/task-delete-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskDeleteRoutes = Router()
const taskDeleteController = new TaskDeleteController()

taskDeleteRoutes.delete(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin", "member"]),
  taskDeleteController.delete
)

export { taskDeleteRoutes }