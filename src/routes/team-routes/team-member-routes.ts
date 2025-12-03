import { Router } from "express"
import { TeamMemberController } from "@/controllers/team-controller/team-member-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamMemberRoutes = Router()
const teamMemberController = new TeamMemberController()

teamMemberRoutes.post(
  "/:id/add-member",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  teamMemberController.create
)

export { teamMemberRoutes }