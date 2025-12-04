import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { z } from "zod"

class TaskCreateController {
  async create(req: Request, res: Response) {
    const userIdFromToken = req.user.id
    const useRoleFromToken = req.user.role

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id: assignedUserId } = paramsSchema.parse(req.params)

    if(useRoleFromToken !== "admin" && userIdFromToken !== assignedUserId){
      throw new AppError("You can only create tasks for yourself", 403)
    }

    const bodySchema = z.object({
      title: z.string().trim().min(5),
      description: z.string().trim().min(5),
      teamId: z.string().uuid(),
    })

    const { title, description, teamId } = bodySchema.parse(req.body)

    const exists = await prisma.teamMembers.findFirst({
      where: {
        userId: assignedUserId,
        teamId,
      },
    })

    if (!exists) {
      throw new AppError("user not in team", 404)
    }

    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        team: {
          connect: { id: teamId },
        },
        assignedTo: {
          connect: { id: assignedUserId },
        },
      },
    })

    return res.status(201).json({ task })
  }
}

export { TaskCreateController }
