import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TaskFilterStatusController {
  async filter(req: Request, res: Response) {
    const userFromRoleToken = req.user.role
    const userFromIdToken = req.user.id

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id: userId } = paramsSchema.parse(req.params)

    if(userFromRoleToken !== "admin" && userFromIdToken !== userId){
      throw new AppError("You can only list tasks for yourself", 403)
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError("user not found", 404)
    }

    const bodySchema = z.object({
      filter: z.enum(["pending", "in_progress", "completed"]),
    })

    const { filter } = bodySchema.parse(req.body)

    if (!filter) {
      throw new AppError("task not found", 404)
    }

    const filterStatus = await prisma.user.findUnique({
      where: { id: userId },

      select: {
        name: true,
        email: true,
        assigned: {
          where: {
            status: filter,
          },
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
          },
        },
      },
    })

    if (!filterStatus || filterStatus.assigned.length === 0) {
      throw new AppError("No tasks found with this status", 404)
    }

    return res.status(200).json(filterStatus)
  }
}

export { TaskFilterStatusController }
