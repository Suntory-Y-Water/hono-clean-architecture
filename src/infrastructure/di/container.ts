import { Container } from 'inversify';
import 'reflect-metadata';
import { CreatePostUseCase } from '../../application/usecases/post/CreatePostUseCase';
import { GetAllPostsUseCase } from '../../application/usecases/post/GetAllPostsUseCase';
import { GetPostUseCase } from '../../application/usecases/post/GetPostUseCase';
import { TYPES } from '../../keys';
import { PostController } from '../controllers/PostController';
import type { IPostRepository } from '../repositories/IPostRepository';
import { PostRepository } from '../repositories/PostRepository';

const container = new Container();

container.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);
container.bind<CreatePostUseCase>(TYPES.CreatePostUseCase).to(CreatePostUseCase);
container.bind<GetAllPostsUseCase>(TYPES.GetAllPostsUseCase).to(GetAllPostsUseCase);
container.bind<GetPostUseCase>(TYPES.GetPostUseCase).to(GetPostUseCase);
container.bind<PostController>(TYPES.PostController).to(PostController);

export { container };
