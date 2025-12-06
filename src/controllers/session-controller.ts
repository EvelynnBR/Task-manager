import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { authConfig } from "@/config/auth"
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { z } from "zod"

class SessionController{
  async session(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { email, password } = bodySchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if(!user){
      throw new AppError("Email ou senha invalido", 401)
    }

    const passwordCompare = await compare(password, user.password)

    if(!passwordCompare){
      throw new AppError("Email ou senha invalido", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign( {role: user.role ?? "member"}, secret, {
      subject: user.id,
      expiresIn
    })
    return res.status(200).json(token)
  }
}

export { SessionController }