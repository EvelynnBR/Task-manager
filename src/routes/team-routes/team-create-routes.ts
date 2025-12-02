import { Router } from "express"
import { TeamCreateController } from "@/controllers/team-controller/team-create-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamCreateRoutes = Router()
const teamCreateController = new TeamCreateController()

teamCreateRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamCreateController.create)


export { teamCreateRoutes }