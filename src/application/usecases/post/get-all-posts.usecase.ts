import { inject, injectable } from 'inversify';
import type { IPostRepository } from '../../../infrastructure/repositories/i-post-repository';
import { REPOSITORY_BINDINGS } from '../../../keys';
import { GetAllPostsUseCaseDto } from '../models/get-all-post.model';

@injectable()
export class GetAllPostsUseCase {
  constructor(
    @inject(REPOSITORY_BINDINGS.PostRepository) private repository: IPostRepository,
  ) {}

  async execute(): Promise<GetAllPostsUseCaseDto> {
    const posts = await this.repository.findAllPosts();
    return new GetAllPostsUseCaseDto(posts);
  }
}
