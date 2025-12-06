import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TaskListHistoryController {
  async logs(req: Request, res: Response) {
    const userRoleFromToken = req.user.role
    const userIdFromToken = req.user.id

    const paramsSchema = z.object({
      taskId: z.string().uuid(),
    })

    const { taskId } = paramsSchema.parse(req.params)

    const task = await prisma.tasks.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      throw new AppError("logs not found")
    }

    const userId = task.assignedId

    if (userRoleFromToken !== "admin" && userIdFromToken !== userId) {
      throw new AppError("You can only list logs for yourself", 401)
    }

    const logs = await prisma.tasks.findMany({
      where: { id: taskId },
      select: {
        id: true,
        title: true,
        description: true,
        history: {
          select: {
            oldStatus: true,
            newStatus: true
          }
        }
      }
    })

    return res.status(200).json(logs)
  }
}

export { TaskListHistoryController }
