import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"

class TeamMemberListController {
  async index(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    const listMembers = await prisma.teams.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,

        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!listMembers) {
      throw new AppError("team not found", 404)
    }

    return res.status(200).json(listMembers)
  }
}

export { TeamMemberListController }
