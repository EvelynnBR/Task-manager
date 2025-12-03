import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { z } from "zod"

class TeamMemberController {
  async create(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id: teamId } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = bodySchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError("user not exists", 404)
    }

    const team = await prisma.teams.findUnique({
      where: { id: teamId },
    })

    if (!team) {
      throw new AppError("team not exists", 404)
    }

    const exists = await prisma.teamMembers.findFirst({
      where: { userId, teamId },
    })

    if (exists) {
      throw new AppError("User already in team", 400)
    }

    const member = await prisma.teamMembers.create({
      data: {
        userId,
        teamId,
      },
    })

    return res.status(201).json({ member })
  }
}

export { TeamMemberController }