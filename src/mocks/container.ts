import { Container } from 'inversify';
import 'reflect-metadata';
import type { IPostRepository } from '../infrastructure/repositories/i-post-repository';
import { REPOSITORY_BINDINGS } from '../keys';
import { MockPostRepository } from './mock-post-repository';

const mockDiContainer = new Container();

mockDiContainer
  .bind<IPostRepository>(REPOSITORY_BINDINGS.PostRepository)
  .to(MockPostRepository);

export { mockDiContainer };
