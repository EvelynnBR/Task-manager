import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class TaskListController {
  async index(req: Request, res: Response) {
    const userRoleFromToken = req.user.role
    const userIdFromToken = req.user.id

    
    
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    
    const { id: userId } = paramsSchema.parse(req.params)
    
    if (userRoleFromToken !== "admin" && userIdFromToken !== userId){
      throw new AppError("You can only list tasks for yourself", 403)
    }


    const userExist = await prisma.user.findUnique({
      where: { id: userId}
    })

    if(!userExist){
      throw new AppError("User not exist", 404)
    }

    const userTask = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        assigned: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true
          },
        },
      },
    })

    return res.status(200).json({ userTask })
  }
}

export { TaskListController }
