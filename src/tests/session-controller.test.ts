import request from "supertest"
import { prisma } from "@/database/prisma"
import { app } from "@/app"

describe("SessionController", () => {
  let user_id: string | null = null

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it("should authenticate a and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Auth jest",
      email: "auth_jest@gmail.com",
      password: "jest123",
    })

    user_id = userResponse.body.id

    const sessionResponse = await request(app).post("/session").send({
      email: "auth_jest@gmail.com",
      password: "jest123"
    })

    expect(sessionResponse.status).toBe(200) 
  })

})
