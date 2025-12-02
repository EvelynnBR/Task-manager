import { Router } from "express"
import { TeamListController } from "@/controllers/team-controller/team-list-controller"

const teamListRoutes = Router()
const teamListController = new TeamListController()

teamListRoutes.get("/", teamListController.index)

export { teamListRoutes }
