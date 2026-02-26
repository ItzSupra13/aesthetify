"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function onboardUser() {
  console.log("IN SYNC IN SYNC IN SYNC")
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  console.log("TRYNA FETCH TRYNA FETCH TRYNA FETCH")
  await fetch("http://localhost:3001/api/users/onboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      imageUrl: user.imageUrl ?? undefined,
    }),
    cache: "no-store",
  });
}
