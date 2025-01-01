import { Hono } from 'hono';
import type { PostController } from '../infrastructure/controllers/PostController';
import { container } from '../infrastructure/di/container';
import { injectDependencies } from '../infrastructure/middleware/injectDependencies';
import { TYPES } from '../keys';
import { routingConfig } from './routing.config';

const app = new Hono();

app.use('*', injectDependencies);

// biome-ignore lint/complexity/noForEach: <explanation>
routingConfig.forEach((route) => {
  app.get(route.path, async (c) => {
    const controller = container.get<PostController>(TYPES.PostController);
    return controller.main(c);
  });
  app.post(route.path, async (c) => {
    const controller = container.get<PostController>(TYPES.PostController);
    return controller.main(c);
  });
});

export default app;
