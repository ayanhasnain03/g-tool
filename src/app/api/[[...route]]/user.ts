import { Hono } from "hono";
const app = new Hono();
app.get("/", (c) => {
  return c.json({
    user: "GET",
  });
});
export default app;
