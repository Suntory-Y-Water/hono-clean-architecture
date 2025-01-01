import { inject, injectable } from 'inversify';
import type { Post } from '../../../domain/models/Post';
import type { IPostRepository } from '../../../infrastructure/repositories/IPostRepository';
import { TYPES } from '../../../keys';

@injectable()
export class GetAllPostsUseCase {
  constructor(
    @inject(TYPES.PostRepository) private postRepository: IPostRepository,
  ) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.findAllPosts();
  }
}
