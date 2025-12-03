import { Router } from "express"
import { TeamMemberDeleteController } from "@/controllers/team-controller/team-member-delete-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamMemberDeleteRoutes = Router()
const teamMemberDeleteController = new TeamMemberDeleteController()

teamMemberDeleteRoutes.delete(
  "/:id/remove",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  teamMemberDeleteController.delete
)

export { teamMemberDeleteRoutes}