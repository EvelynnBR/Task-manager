import request from "supertest"
import { prisma } from "@/database/prisma"
import { app } from "@/app"

describe("UserController", () =>{
  let user_id: string | null = null

  afterAll(async() => {
    await prisma.user.delete({ where: { id: user_id }})
  })

  it("should create a new user successfully", async() => {
    const response = await request(app).post("/users").send({
      name: "jest",
      email: "jest2025@gmail.com",
      password: "jest123"
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body.name). toBe("jest")

    user_id = response.body.id
  })

  it("should throw an error user same email already exists", async() => {
    const response = await request(app).post("/users").send({
      name: "duplicate Jest",
      email: "jest2025@gmail.com",
      password: "jest123"
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Email já cadastrado!")
  })
})