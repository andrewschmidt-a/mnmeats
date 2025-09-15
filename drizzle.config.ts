import { defineConfig } from 'drizzle-kit';

const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  
  dbCredentials: {
    url: databaseUrl,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },

  verbose: true,
  strict: false,
  dialect: 'sqlite'
});
