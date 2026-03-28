import { Elysia } from 'elysia';
import { serve } from 'inngest/bun';
import { functions, inngest } from '@/inngest/index';
import { authMiddleware } from './middlewares';
import { getSubscriptionToken } from "@inngest/realtime";

const handler = serve({
	client: inngest,
	functions,
});

export const inngestHandler = new Elysia({ prefix: "/inngest" }).all(
  "/",
  ({ request }) => {
    return handler(request); 
  }
);

export const realtimeRouter = new Elysia({ prefix: '/realtime' })
	.use(authMiddleware)
	.get("/token", async ({ clerkUserId }) => {
    if (!clerkUserId) {
      throw new Error("Unauthorized");
    }

    const token = await getSubscriptionToken(inngest, {
      channel: `user:${clerkUserId}`,
      topics: ["generation.start","analysis.start","analysis.complete","frame.created","generation.complete"],
    });

    return token;
  })
