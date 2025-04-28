import { type AuthConfig, initAuthConfig } from '@hono/auth-js';
import { type Context, Hono } from 'hono';
import { handle } from 'hono/vercel';

import authConfig from '@/auth.config';

import ai from './ai';
import images from './images';
import users from './users';
import test from './test';

export const runtime = 'nodejs';

const getAuthConfig = (c: Context): AuthConfig => {
  const authSecret = c.env ? c.env.AUTH_SECRET : process.env.AUTH_SECRET;
  if (!authSecret) {
    throw new Error('AUTH_SECRET is missing in the environment variables');
  }

  return {
    secret: authSecret,
    ...authConfig,
  };
};

const app = new Hono().basePath('/api');

app.use('*', initAuthConfig(getAuthConfig));

const routes = app.route('/ai', ai)
.route('/images', images)
.route('/users', users)
.route('/test', test);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
