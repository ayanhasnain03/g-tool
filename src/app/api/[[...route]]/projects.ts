import { verifyAuth } from '@hono/auth-js';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { db } from '@/db/drizzle';
import { projects, projectsInsertSchema } from '@/db/schema';

const app = new Hono().post(
  '/',
  verifyAuth(),
  zValidator(
    'json',
    projectsInsertSchema.pick({
      name: true,
      json: true,
      width: true,
      height: true,
    }),
  ),
  async (ctx) => {
    const auth = ctx.get('authUser');
    const { name, json, width, height } = ctx.req.valid('json');

    if (!auth.token?.id) {
      return ctx.json('Unauthorized!', 401);
    }

    const [data] = await db
      .insert(projects)
      .values({
        name,
        json,
        width,
        height,
        userId: auth.token.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!data) return ctx.json('Unable to create project!', 500);

    return ctx.json(data);
  },
);

export default app;
