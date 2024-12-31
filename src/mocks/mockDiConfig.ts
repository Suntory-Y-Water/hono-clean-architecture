import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../keys';
import type { IPostRepository } from '../postRepository';
import { MockPostRepository } from './mockPostRepository';

const mockDiContainer = new Container();

mockDiContainer.bind<IPostRepository>(TYPES.PostRepository).to(MockPostRepository);

export { mockDiContainer };
