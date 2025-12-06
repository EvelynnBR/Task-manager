import { Router } from "express"
import { TaskListHistoryController } from "@/controllers/task/task-list-history-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const taskListHistoryRoutes = Router()
const taskListHistoryController = new TaskListHistoryController()

taskListHistoryRoutes.get(
  "/:taskId",
  ensureAuthenticated,
  verifyUserAuthorization(["admin", "member"]),
  taskListHistoryController.logs
)

export { taskListHistoryRoutes }