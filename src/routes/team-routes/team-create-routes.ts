import { Router } from "express"
import { TeamCreateController } from "@/controllers/team-controller/team-create-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamRoutes = Router()
const teamCreateController = new TeamCreateController()

teamRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamCreateController.create)


export { teamRoutes }