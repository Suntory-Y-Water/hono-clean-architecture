import { inject, injectable } from 'inversify';
import type { Post, PostId } from '../../../domain/models/Post';
import type { IPostRepository } from '../../../infrastructure/repositories/IPostRepository';
import { TYPES } from '../../../keys';

@injectable()
export class GetPostUseCase {
  constructor(
    @inject(TYPES.PostRepository) private postRepository: IPostRepository,
  ) {}

  async execute(id: PostId): Promise<Post> {
    return this.postRepository.findPost(id);
  }
}
