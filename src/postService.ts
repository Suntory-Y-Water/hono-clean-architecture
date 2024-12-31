import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './keys';
import type { Message, Post, PostId } from './post';
import type { IPostRepository } from './postRepository';

export interface IPostService {
  getPost(id: PostId): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<Message>;
}

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(TYPES.PostRepository) private postRepository: IPostRepository,
  ) {}

  async getPost(id: PostId): Promise<Post> {
    return await this.postRepository.findPost(id);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.findAllPosts();
  }

  async createPost(post: Post): Promise<Message> {
    return await this.postRepository.createPost(post);
  }
}
