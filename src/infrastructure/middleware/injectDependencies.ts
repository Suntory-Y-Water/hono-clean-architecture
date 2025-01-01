import type { MiddlewareHandler } from 'hono';
import { container } from '../../infrastructure/di/container';
import { TYPES } from '../../keys';
import type { PostController } from '../controllers/PostController';

export const injectDependencies: MiddlewareHandler = async (c, next) => {
  const postController = container.get<PostController>(TYPES.PostController);
  c.set('postController', postController);
  await next();
};
