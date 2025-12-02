import { Router } from "express"
import { TeamController } from "@/controllers/team-controller/team-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamRoutes = Router()
const teamController = new TeamController()

teamRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamController.create)


export { teamRoutes }