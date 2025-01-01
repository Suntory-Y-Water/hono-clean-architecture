export const CONTROLLER_BINDINGS = {
  CreatePostController: Symbol.for('CreatePostController'),
  GetAllPostsController: Symbol.for('GetAllPostsController'),
  GetPostController: Symbol.for('GetPostController'),
};

export const USECASE_BINDINGS = {
  CreatePostUseCase: Symbol.for('CreatePostUseCase'),
  GetAllPostsUseCase: Symbol.for('GetAllPostsUseCase'),
  GetPostUseCase: Symbol.for('GetPostUseCase'),
};

export const REPOSITORY_BINDINGS = {
  PostRepository: Symbol.for('PostRepository'),
};
