import { injectable } from 'inversify';
import type { Message, Post, PostId } from '../../domain/models/Post';
import type { IPostRepository } from '../../domain/repositories/IPostRepository';

@injectable()
export class PostRepository implements IPostRepository {
  private readonly apiUrl = 'http://localhost:3000/posts';

  async findPost(id: PostId): Promise<Post> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post with id ${id}`);
    }
    return response.json() as Promise<Post>;
  }

  async findAllPosts(): Promise<Post[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json() as Promise<Post[]>;
  }

  async createPost(post: Post): Promise<Message> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create post Error!');
    }
    return { message: 'Post created successfully!' };
  }
}
