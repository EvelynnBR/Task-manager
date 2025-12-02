import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class TeamDeleteController {
  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const team_id = await prisma.teams.findUnique({
      where: { id },
    })

    if (!team_id) {
      throw new AppError("team not found", 404)
    }

    await prisma.teams.delete({
      where: { id: id },
    })

    return res.status(200).json({ message: "OK" })
  }
}

export { TeamDeleteController }
