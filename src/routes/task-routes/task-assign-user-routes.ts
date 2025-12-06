import { Router } from "express"
import { TaskAssignUserController } from "@/controllers/task/task-assign-user-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskAssignUserRoutes = Router()
const taskAssignUserController = new TaskAssignUserController()

taskAssignUserRoutes.put(
  "/:userId",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  taskAssignUserController.assign
)

export { taskAssignUserRoutes }