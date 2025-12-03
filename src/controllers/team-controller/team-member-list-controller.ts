import { Request, Response } from "express"
import { prisma } from "@/database/prisma"

class TeamMemberListController {
  async index(req: Request, res: Response) {
    const listMembers = await prisma.teamMembers.findMany({
      select: {
        team: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return res.status(200).json(listMembers)
  }
}

export { TeamMemberListController }
