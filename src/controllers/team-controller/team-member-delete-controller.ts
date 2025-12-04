import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { z } from "zod"

class TeamMemberDeleteController {
  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const exists = await prisma.teamMembers.findFirst({
      where: { id },
    })

    if (!exists) {
      throw new AppError("Member team not exist", 404)
    }

    await prisma.teamMembers.delete({
      where: { id },
    })

    res.status(201).json({message: "Removed"})
  }
}
export { TeamMemberDeleteController }
