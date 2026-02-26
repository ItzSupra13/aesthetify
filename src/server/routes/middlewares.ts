import { Elysia } from "elysia"
import { verifyToken } from "@clerk/backend"

export const authMiddleware = new Elysia().derive(
  { as: "scoped" },
  async ({ request, set }) => {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      set.status = 401
      throw new Error("Unauthorized")
    }
    const token = authHeader.replace("Bearer ", "")
    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      })
      return {
        clerkUserId: payload.sub,
      }
    } catch (err) {
      set.status = 401
      throw new Error("Invalid token")
    }
  }
)
