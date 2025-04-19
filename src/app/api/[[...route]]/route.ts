import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";
const app = new Hono().basePath("/api");
app.get("/test", (c) => {
  return c.json({
    test: "Hono Test",
  });
});
export const GET = handle(app);
