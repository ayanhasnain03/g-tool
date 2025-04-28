import { unsplash } from "@/lib/unsplash";
import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_IDS = ["317099"];

const app = new Hono().get("/", verifyAuth(),
 async (c) => {

  const images = await unsplash.photos.getRandom({
   collectionIds: DEFAULT_COLLECTION_IDS,
   count: DEFAULT_COUNT,
  });

  // If there's an error, return 400
  if (images.errors) {
   return c.json({ error: images.errors.join(", ") }, 400);
  }

  // Normalize the response to always be an array
  let response = images.response;
  if (!Array.isArray(response)) {
   response = [response];
  }

  return c.json({ data: response });
 });

export default app;
