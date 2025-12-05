import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TaskFilterPriorityController {
  async filter(req: Request, res: Response) {
    const userFromRole = req.user.role
    const userFromId = req.user.id

    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    if (userFromRole !== "admin" && userFromId !== userId) {
      throw new AppError("you can only filter task for yourself", 403)
    }

    const bodySchema = z.object({
      priority: z.enum(["high", "medium", "low"]),
    })
    const { priority } = bodySchema.parse(req.body)

    const listPriority = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        assigned: {
          where: {
            priority: priority,
          },
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
          },
        },
      },
    })

    return res.status(200).json(listPriority)
  }
}

export { TaskFilterPriorityController }
