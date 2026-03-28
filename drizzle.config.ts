import { defineConfig } from 'drizzle-kit';
import 'dotenv/config'

export default defineConfig({
  out: './drizzle',
  schema: './src/server/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_EVMiv28csLaF@ep-winter-silence-aibmvt7b-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
});
