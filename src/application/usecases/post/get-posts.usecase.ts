import { inject, injectable } from 'inversify';
import type { Post, PostId } from '../../../domain/models/posts';
import type { IPostRepository } from '../../../infrastructure/repositories/i-post-repository';
import { REPOSITORY_BINDINGS } from '../../../keys';

@injectable()
export class GetPostUseCase {
  constructor(
    @inject(REPOSITORY_BINDINGS.PostRepository) private repository: IPostRepository,
  ) {}

  async execute(id: PostId): Promise<Post> {
    return this.repository.findPost(id);
  }
}
