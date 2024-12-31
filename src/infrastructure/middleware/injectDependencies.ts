import type { MiddlewareHandler } from 'hono';
import type { IPostUsecase } from '../../application/usecases/PostUsecase';
import { container } from '../../infrastructure/di/container';
import { TYPES } from '../../keys';

export const injectDependencies: MiddlewareHandler = async (c, next) => {
  const postUsecase = container.get<IPostUsecase>(TYPES.PostUsecase);
  c.set('postUsecase', postUsecase);
  return next();
};
