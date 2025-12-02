import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class TeamUpdateController {
  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    const team_id = await prisma.teams.findUnique({
      where: {
        id: id,
      },
    })

    if (!team_id) {
      throw new AppError("team not found", 404)
    }

    const bodySchema = z.object({
      name: z.string().trim().min(5),
      description: z.string().trim().min(5),
    })

    const { name, description } = bodySchema.parse(req.body)

    const teamUpdated = await prisma.teams.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    })

    return res.status(200).json({ teamUpdated })
  }
}

export { TeamUpdateController }
