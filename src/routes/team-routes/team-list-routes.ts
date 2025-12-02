import { Router } from "express"
import { TeamListController } from "@/controllers/team-controller/team-list-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamListRoutes = Router()
const teamListController = new TeamListController()

teamListRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamListController.index)

export { teamListRoutes }
