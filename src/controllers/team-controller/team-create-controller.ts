import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class TeamController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(5),
      description: z.string().trim().min(5)
    })

    const { name, description} = bodySchema.parse(req.body)

    const team = await prisma.teams.create({
      data: {
        name,
        description
      }
    })

    return res.status(201).json({team})
  }
}

export { TeamController }