import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { node } from '@elysiajs/node'
import { openapi } from '@elysiajs/openapi'

import { userRouter } from './routes/user'
import { projectRouter } from './routes/project'

export const app = new Elysia({prefix: '/api', adapter: node()})
  .use(openapi())
  .get('/', () => 'API is running')
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }))
  .use(userRouter)
  .use(projectRouter)
  .listen(3001, () => console.log("🦊 listening on http://localhost:3001"))      