import type { MiddlewareHandler } from 'hono';
import { container } from '../container';
import { TYPES } from '../keys';
import type { IPostService } from '../postService';

export const injectDependencies: MiddlewareHandler = async (c, next) => {
  const postService = container.get<IPostService>(TYPES.PostService);
  c.set('container', container);
  c.set('postService', postService);
  return next();
};
