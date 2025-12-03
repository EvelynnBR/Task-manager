import { Router } from "express"
import { TeamMemberListController } from "@/controllers/team-controller/team-member-list-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamMemberListRoutes = Router()
const teamMemberListController = new TeamMemberListController()

teamMemberListRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  teamMemberListController.index
)

export { teamMemberListRoutes }