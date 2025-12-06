import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TaskAssignUserController {
  async assign(req: Request, res: Response) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError("user not found", 404)
    }

    const bodySchema = z.object({
      taskId: z.string().uuid(),
    })

    const { taskId } = bodySchema.parse(req.body)

    const task = await prisma.tasks.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      throw new AppError("task not found", 404)
    }

    const alreadyAssigned = await prisma.user.findFirst({
      where: {
        id: userId,
        assigned: {
          some: { id: taskId },
        },
      },
    })

    if (alreadyAssigned) {
      throw new AppError("Task already assigned to this user", 409)
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        assigned: {
          connect: {
            id: taskId,
          },
        },
      },
    })

    const taskUsers = await prisma.tasks.findFirst({
      where: { id: taskId },
      select: {
        assignedTo: {
          select: {
            name: true
          },
        },
        title: true,
        description: true,
        status: true,
        priority: true
      }

    })

    return res.status(200).json({ taskUsers })
  }
}

export { TaskAssignUserController }
