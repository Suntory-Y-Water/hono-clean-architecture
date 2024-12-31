import { MiddlewareHandler } from 'hono';
import { diContainer } from '../diConfig';
import { TYPES } from '../types';
import { IPostService } from '../postService';

export const injectDependencies: MiddlewareHandler = async (c, next) => {
  const postService = diContainer.get<IPostService>(TYPES.PostService);
  c.set('diContainer', diContainer);
  c.set('postService', postService);
  return next();
};
