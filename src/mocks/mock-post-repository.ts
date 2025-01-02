import { injectable } from 'inversify';
import 'reflect-metadata';
import type { Message, Post, PostId } from '../domain/models/posts';

export interface IPostRepository {
  findPost(id: PostId): Promise<Post>;
  findAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<Message>;
}

@injectable()
export class MockPostRepository implements IPostRepository {
  private posts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Content of Post 1' },
    { id: 2, userId: 2, title: 'Post 2', body: 'Content of Post 2' },
  ];

  async findPost(id: number): Promise<Post> {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new Error('Post not found');
    return post;
  }

  async findAllPosts(): Promise<Post[]> {
    return this.posts;
  }

  async createPost(post: Post) {
    const newPost: Post = { ...post, id: Date.now() };
    this.posts.push(newPost);
    return Promise.resolve({ message: 'Post created successfully!' });
  }
}
