import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";
export const runtime = "nodejs";
const app = new Hono().basePath("/api");
app.route("/users", user);
export const GET = handle(app);
