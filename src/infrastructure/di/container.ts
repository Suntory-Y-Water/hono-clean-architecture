import { Container } from 'inversify';
import 'reflect-metadata';
import { CreatePostUseCase } from '../../application/usecases/post/create-post.usecase';
import { GetAllPostsUseCase } from '../../application/usecases/post/get-all-posts.usecase';
import { GetPostUseCase } from '../../application/usecases/post/get-posts.usecase';
import {
  CONTROLLER_BINDINGS,
  REPOSITORY_BINDINGS,
  USECASE_BINDINGS,
} from '../../keys';
import { CreatePostController } from '../controllers/create-post.controller';
import { GetAllPostsController } from '../controllers/get-all-post.controller';
import { GetPostController } from '../controllers/get-post.controller';
import type { IPostRepository } from '../repositories/i-post-repository';
import { PostRepository } from '../repositories/post-repository';

function bindRepositories(container: Container): void {
  container
    .bind<IPostRepository>(REPOSITORY_BINDINGS.PostRepository)
    .to(PostRepository);
}

function bindUseCases(container: Container): void {
  container
    .bind<CreatePostUseCase>(USECASE_BINDINGS.CreatePostUseCase)
    .to(CreatePostUseCase);
  container
    .bind<GetAllPostsUseCase>(USECASE_BINDINGS.GetAllPostsUseCase)
    .to(GetAllPostsUseCase);
  container.bind<GetPostUseCase>(USECASE_BINDINGS.GetPostUseCase).to(GetPostUseCase);
}

function bindControllers(container: Container): void {
  container
    .bind<GetPostController>(CONTROLLER_BINDINGS.GetPostController)
    .to(GetPostController);
  container
    .bind<GetAllPostsController>(CONTROLLER_BINDINGS.GetAllPostsController)
    .to(GetAllPostsController);
  container
    .bind<CreatePostController>(CONTROLLER_BINDINGS.CreatePostController)
    .to(CreatePostController);
}

/**
 * DIコンテナを生成して返す
 */
export function createContainer(): Container {
  const container = new Container();
  bindControllers(container);
  bindUseCases(container);
  bindRepositories(container);
  return container;
}
