import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TaskStatusController {
  async status(req: Request, res: Response) {
    const userFromRoleToken = req.user.role
    const userFromIdToken = req.user.id

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id: userId } = paramsSchema.parse(req.params)

    if (userFromRoleToken !== "admin" && userFromIdToken !== userId) {
      throw new AppError("You can only list tasks for yourself", 403)
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError("user not found", 404)
    }

    const bodySchema = z.object({
      id: z.string().uuid(),
      status: z.enum(["pending", "in_progress", "completed"]),
    })

    const { id: taskId, status } = bodySchema.parse(req.body)

    const task = await prisma.tasks.findFirst({
      where: { id: taskId },
    })

    if (!task) {
      throw new AppError("task not found", 404)
    }

    const oldStatus = task.status
    const newStatus = status

    await prisma.tasks.update({
      where: { id: taskId },
      data: { status },
    })

    await prisma.tasksHistory.create({
      data: {
        taskId: taskId,
        changedId: userId,
        oldStatus: oldStatus,
        newStatus: newStatus,
      },
    })

    return res.status(200).json({ message: "OK" })
  }
}

export { TaskStatusController }
