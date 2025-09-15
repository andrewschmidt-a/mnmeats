import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

// Use Turso URL if available, otherwise local SQLite
// Ignore PostgreSQL URLs since we're configured for Turso
const databaseUrl = (env.DATABASE_URL && env.DATABASE_URL.startsWith('libsql:')) 
  ? env.DATABASE_URL 
  : 'file:dev.db';

console.log('Using database:', databaseUrl.includes('file:') ? 'Local SQLite' : 'Turso');

// Only require auth token for remote Turso connections
if (!dev && databaseUrl.startsWith('libsql:') && !env.DATABASE_AUTH_TOKEN) {
  throw new Error('DATABASE_AUTH_TOKEN is required for Turso connection');
}

const client = createClient({ 
  url: databaseUrl,
  authToken: env.DATABASE_AUTH_TOKEN
});

export const db = drizzle(client);
