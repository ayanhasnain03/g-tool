import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";

export const runtime = "nodejs";

// Initialize the Hono app and chain routes
const app = new Hono().basePath("/api").route("/user", user);

// Handle requests
export const GET = handle(app);

// Type for the app's routes
export type AppType = typeof app;
