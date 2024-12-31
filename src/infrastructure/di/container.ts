import { Container } from 'inversify';
import 'reflect-metadata';
import type { IPostUsecase } from '../../application/usecases/PostUsecase';
import { PostUsecase } from '../../application/usecases/PostUsecase';
import type { IPostRepository } from '../../domain/repositories/IPostRepository';
import { TYPES } from '../../keys';
import { PostRepository } from '../repositories/PostRepository';

const container = new Container();

container.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);
container.bind<IPostUsecase>(TYPES.PostUsecase).to(PostUsecase);

export { container };
