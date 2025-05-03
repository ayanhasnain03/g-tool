import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts', // Ensure this is the correct path to your schema file
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string, // Ensure DATABASE_URL is set in .env
  },
  verbose: true,
  strict: true, // Optional: Use `true` to enforce stricter schema checks
});
