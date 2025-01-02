import { inject, injectable } from 'inversify';
import type { Message, Post } from '../../../domain/models/posts';
import { PostTitle } from '../../../domain/valueObjects/post-title';
import type { IPostRepository } from '../../../infrastructure/repositories/i-post-repository';
import { REPOSITORY_BINDINGS } from '../../../keys';

export interface CreatePostUseCaseInput {
  title: string;
  body: string;
}

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject(REPOSITORY_BINDINGS.PostRepository) private repository: IPostRepository,
  ) {}

  async execute(input: CreatePostUseCaseInput): Promise<Message> {
    try {
      const title = new PostTitle(input.title);
      const post: Post = {
        id: 0, // idはrepositoryで付与される想定
        userId: 1, // userIdは固定値
        title: title.value,
        body: input.body,
      };
      return this.repository.createPost(post);
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message };
      }
      return { message: 'Internal Server Error' };
    }
  }
}
