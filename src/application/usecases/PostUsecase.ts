import { inject, injectable } from 'inversify';
import type { Message, Post, PostId } from '../../domain/models/Post';
import type { IPostRepository } from '../../infrastructure/repositories/IPostRepository';
import { TYPES } from '../../keys';

export interface IPostUsecase {
  getPost(id: PostId): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<Message>;
}

@injectable()
export class PostUsecase implements IPostUsecase {
  constructor(
    @inject(TYPES.PostRepository) private postRepository: IPostRepository,
  ) {}

  async getPost(id: PostId): Promise<Post> {
    return this.postRepository.findPost(id);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.findAllPosts();
  }

  async createPost(post: Post): Promise<Message> {
    return this.postRepository.createPost(post);
  }
}
