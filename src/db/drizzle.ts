
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://gtooldb_owner:npg_VbUqDxWw4P8v@ep-tiny-block-a47dmvic-pooler.us-east-1.aws.neon.tech/gtooldb?sslmode=require");
export const db = drizzle({ client: sql });
