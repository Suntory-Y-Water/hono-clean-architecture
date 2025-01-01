import { inject, injectable } from 'inversify';
import type { Post } from '../../../domain/models/Post';
import type { IPostRepository } from '../../../infrastructure/repositories/IPostRepository';
import { REPOSITORY_BINDINGS } from '../../../keys';

@injectable()
export class GetAllPostsUseCase {
  constructor(
    @inject(REPOSITORY_BINDINGS.PostRepository) private repository: IPostRepository,
  ) {}

  async execute(): Promise<Post[]> {
    return this.repository.findAllPosts();
  }
}
