import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../types';
import { IPostRepository } from '../postRepository';
import { MockPostRepository } from './mockPostRepository';

const mockDiContainer = new Container();

mockDiContainer.bind<IPostRepository>(TYPES.PostRepository).to(MockPostRepository);

export { mockDiContainer };
