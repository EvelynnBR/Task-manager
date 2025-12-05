import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TaskPriorityController {
  async priority(req: Request, res: Response) {
    const userFromRole = req.user.role
    const userFromId = req.user.id

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id: userId } = paramsSchema.parse(req.params)

    if (userFromRole !== "admin" && userFromId !== userId) {
      throw new AppError("You can only list tasks for yourself", 403)
    }

    const bodySchema = z.object({
      taskId: z.string().uuid(),
      priority: z.enum(["high", "medium", "low"]),
    })

    const { taskId, priority } = bodySchema.parse(req.body)

    const task = await prisma.tasks.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      throw new AppError("task not found", 404)
    }

    await prisma.tasks.update({
      where: { id: taskId },
      data: {
        priority: priority,
      },
    })

    return res.status(200).json()
  }
}

export { TaskPriorityController }
