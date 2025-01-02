import { inject, injectable } from 'inversify';
import type { PostId } from '../../../domain/models/posts';
import type { IPostRepository } from '../../../infrastructure/repositories/i-post-repository';
import { REPOSITORY_BINDINGS } from '../../../keys';
import { GetPostUseCaseDto } from '../models/get-post.model';

@injectable()
export class GetPostUseCase {
  constructor(
    @inject(REPOSITORY_BINDINGS.PostRepository) private repository: IPostRepository,
  ) {}

  async execute(id: PostId): Promise<GetPostUseCaseDto> {
    const post = await this.repository.findPost(id);
    return new GetPostUseCaseDto(post);
  }
}
