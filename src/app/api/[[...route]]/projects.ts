import { verifyAuth } from '@hono/auth-js';
import { zValidator } from '@hono/zod-validator';
import { and, desc, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '@/db/drizzle';
import { projects, projectsInsertSchema } from '@/db/schema';

const app = new Hono()
.get("/",verifyAuth(),zValidator("query",z.object({
 page:z.coerce.number(),
 limit:z.coerce.number(),
})),
async(c) =>{
const auth = c.get("authUser");
const {page,limit} = c.req.valid("query");
if(!auth.token?.id){
 return c.json({error:"Unauthorized"},401);
}
const data = await db
.select()
.from(projects)
.where(eq(projects.userId,auth.token.id))
.limit(limit)
.offset((page-1) * limit)
.orderBy(desc(projects.updatedAt))
return c.json({data,
nextPage:data.length === limit ? page + 1 : null
})
}
)
.patch(
 '/:id',
 verifyAuth(),
 zValidator(
   'param',
   z.object({
     id: z.string(),
   }),
 ),
 zValidator(
   'json',
   projectsInsertSchema
     .omit({
       id: true,
       userId: true,
       createdAt: true,
       updatedAt: true,
     })
     .partial(),
 ),
 async (ctx) => {
   const auth = ctx.get('authUser');
   const { id } = ctx.req.valid('param');
   const values = ctx.req.valid('json');

   if (!auth.token?.id) {
     return ctx.json('Unauthorized!', 401);
   }

   const [data] = await db
     .update(projects)
     .set({
       ...values,
       updatedAt: new Date(),
     })
     .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
     .returning();

   if (!data) {
     return ctx.json('Not found.', 404);
   }

   return ctx.json(data);
 },
)
  .get(
    '/:id',
    verifyAuth(),
    zValidator(
      'param',
      z.object({
        id: z.string(),
      }),
    ),
    async (ctx) => {
      const auth = ctx.get('authUser');

      const { id } = ctx.req.valid('param');

      if (!auth.token?.id) {
        return ctx.json('Unauthorized!', 401);
      }

      const [data] = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (!data) {
        return ctx.json('Not found.', 404);
      }

      return ctx.json(data);
    },
  )
  .post(
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
