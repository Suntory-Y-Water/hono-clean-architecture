import 'reflect-metadata';
import { Container } from 'inversify';
import { IPostService, PostService } from './postService';
import { IPostRepository, PostRepository } from './postRepository';
import { TYPES } from './types';

const diContainer = new Container();

diContainer.bind<IPostService>(TYPES.PostService).to(PostService);
diContainer.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);

export { diContainer };
