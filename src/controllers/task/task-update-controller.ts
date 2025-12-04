import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { z } from "zod"

class TaskUpdateController {
  async update(req: Request, res: Response) {
    const userFromRole = req.user.role
    const userFromId = req.user.id

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id: taskId } = paramsSchema.parse(req.params)

    const task = await prisma.tasks.findFirst({
      where: { id: taskId },
    })

    if (!task) {
      throw new AppError("task not found", 404)
    }

    const ownerId = task.assignedId

    const isAdmin = userFromRole === "admin"
    const isOwner = userFromId === ownerId

    if (!isAdmin && !isOwner) {
      throw new AppError("You can only list tasks for yourself", 403)
    }

    const bodySchema = z.object({
      title: z.string().trim().min(5),
      description: z.string().trim().min(5),
    })

    const { title, description } = bodySchema.parse(req.body)

    const taskUpdated = await prisma.tasks.update({
      where: { id: taskId },
      data: {
        title,
        description,
      },
    })

    return res.status(200).json(taskUpdated)
  }
}

export { TaskUpdateController }
