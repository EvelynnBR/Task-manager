import { Router } from "express"
import { TeamDeleteController } from "@/controllers/team-controller/team-delete-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamDeleteRoutes = Router()
const teamDeleteController = new TeamDeleteController()

teamDeleteRoutes.delete(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  teamDeleteController.delete
)

export { teamDeleteRoutes }
