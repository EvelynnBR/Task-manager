import { Router } from "express"
import { TaskUpdateController } from "@/controllers/task/task-update-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskUpdateRoutes = Router()
const taskUpdateController = new TaskUpdateController()

taskUpdateRoutes.put(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin", "member"]),
  taskUpdateController.update
)

export { taskUpdateRoutes }