import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './keys';
import { type IPostRepository, PostRepository } from './postRepository';
import { type IPostService, PostService } from './postService';

const container = new Container();

container.bind<IPostService>(TYPES.PostService).to(PostService);
container.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);

export { container };
