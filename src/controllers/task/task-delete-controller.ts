import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import z from "zod"

class TaskDeleteController {
  async delete(req: Request, res: Response) {
    const userRole = req.user.role
    const userId = req.user.id
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id: taskId } = paramsSchema.parse(req.params)

    const task = await prisma.tasks.findFirst({
      where: { id: taskId },
    })

    if (!task){
      throw new AppError("task not found", 404)
    }

    const ownerId = task.assignedId

    const isAdmin = userRole === "admin"
    const isOwner = userId === ownerId

    if (!isAdmin && !isOwner) {
      throw new AppError("You can only list tasks for yourself", 403)
    }

    await prisma.tasks.delete({
      where: { id: taskId },
    })

    return res.status(200).json({ message: "deleted" })
  }
}

export { TaskDeleteController }
