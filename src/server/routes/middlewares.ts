import { Elysia } from "elysia";
import { verifyToken } from "@clerk/backend";
import { clerk } from "../clerk";
import { db } from "@/server/db";
import { users } from "@/server/schema/user";
import { eq } from "drizzle-orm";
import 'dotenv/config'

export const authMiddleware = new Elysia().derive(
  { as: "scoped" },
  async ({ request, set }) => {
    console.log("IN AUTH MIDDLEWARE")

    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      set.status = 401;
      throw new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    console.log("TRYING PAYLOAD ",process.env.CLERK_SECRET_KEY)

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });
      console.log("GOT PAYLOAD")
      const clerkUserId = payload.sub;
      console.log("GOT CLERK USER ID")

      if (!clerkUserId) {
        set.status = 401;
        throw new Error("Invalid token payload");
      }

      console.log("TRYING ID")

      // Check if user exists in DB
      let user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkUserId),
      });

      console.log("FOUND USER!")

      // If not → fetch from Clerk + create
      if (!user) {

        const clerkUser = await clerk.users.getUser(clerkUserId);

        const email =
          clerkUser.emailAddresses[0]?.emailAddress ?? "unknown@email.com";

        const firstName = clerkUser.firstName ?? null;
        const lastName = clerkUser.lastName ?? null;
        const imageUrl = clerkUser.imageUrl ?? null;

        const [createdUser] = await db
          .insert(users)
          .values({
            clerkId: clerkUserId,
            email,
            firstName,
            lastName,
            imageUrl,
          })
          .returning();

        user = createdUser;
      }
      console.log("RETURNING USER");
      return {
        user,
        clerkUserId,
      };

    } catch (err) {
      set.status = 401;
      throw new Error("Invalid or expired token");
    }
  }
);