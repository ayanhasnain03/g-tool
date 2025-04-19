import { Hono } from "hono";

const app = new Hono();

app
  .get("/", (c) => {
    return c.json({ user: "GET" });
  })
  // Apply manual validation for :name parameter
  .get("/:name", (c) => {
    const name = c.req.param("name");

    // Perform manual validation
    if (!name || name.length < 1 || name.length > 50) {
      return c.json({ error: "Name must be between 1 and 50 characters" }, 400); // Return 400 if validation fails
    }

    return c.json({ userName: name }, 200); // Return 200 OK if validation passes
  });

export default app;
