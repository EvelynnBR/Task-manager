import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { z } from "zod"

class TaskCreateController {
  async create(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      title: z.string().trim().min(5),
      description: z.string().trim().min(5),
      teamId: z.string().uuid()
    })

    const { title, description, teamId } = bodySchema.parse(req.body)

    const exists = await prisma.teamMembers.findFirst({
      where: { 
        userId: id,
        teamId
       },
    })

    if (!exists){
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
          connect: { id: id },
        },
      },
    })

    return res.status(201).json({ task })
  }
}

export { TaskCreateController }
