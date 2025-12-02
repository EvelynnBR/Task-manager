import { Request, Response } from "express"
import { prisma } from "@/database/prisma"

class TeamListController {
  async index(req: Request, res: Response) {
    const teams = await prisma.teams.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    })

    return res.status(200).json({ teams })
  }
}

export { TeamListController }
