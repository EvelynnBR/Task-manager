import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { hash } from "bcrypt"
import { z } from "zod"

class UserController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = bodySchema.parse(req.body)

    const passwordHashed = await hash(password, 8)

    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExists) {
      throw new AppError("Email já cadastrado!")
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    })

    return res.status(201).json(user)
  }
}

export { UserController }
