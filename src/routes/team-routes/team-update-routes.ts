import { Router } from "express"
import { TeamUpdateController } from "@/controllers/team-controller/team-update-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamUpdateRoutes = Router()
const teamUpdateController = new TeamUpdateController()

teamUpdateRoutes.put("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), teamUpdateController.update)

export { teamUpdateRoutes}