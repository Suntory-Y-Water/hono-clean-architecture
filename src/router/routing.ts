import { Hono } from 'hono';
import type { BaseController } from '../infrastructure/controllers/base.controller';
import { createContainer } from '../infrastructure/di/container';
import { routingConfig } from './routing.config';

const app = new Hono();

const container = createContainer();

// biome-ignore lint/complexity/noForEach: <explanation>
routingConfig.forEach((route) => {
  const controller = container.get<BaseController>(route.serviceName);
  app.get(route.path, (c) => controller.main(c));
  app.post(route.path, (c) => controller.main(c));
});

export default app;
