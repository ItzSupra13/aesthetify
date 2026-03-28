import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { node } from '@elysiajs/node';
import { openapi } from '@elysiajs/openapi';

import { projectRouter } from './routes/project';
import { inngestHandler, realtimeRouter } from './routes/inngest';

export const app = new Elysia({ prefix: '/api', adapter: node() })
	.use(
		cors({
			origin: ['http://localhost:3000'],
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		}),
	)
	.use(openapi())
	.get('/', () => 'API is running')
	.use(inngestHandler)
	.use(realtimeRouter)
	.use(projectRouter)
	.listen(3001, () => console.log('🦊 listening on http://localhost:3001'));
