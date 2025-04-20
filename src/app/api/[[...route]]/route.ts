import { Hono } from "hono";
import { handle } from "hono/vercel";
import ai from "./ai";
import images from "./images";
export const runtime = "nodejs";

// Initialize the Hono app and chain routes
const app = new Hono()
  .basePath("/api")
  .route("/ai", ai)
  .route("/images", images);

// Handle requests
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
// Type for the app's routes
export type AppType = typeof app;
