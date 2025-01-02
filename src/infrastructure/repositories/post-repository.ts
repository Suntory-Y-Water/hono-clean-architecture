import { injectable } from 'inversify';
import type { Message, Post, PostId } from '../../domain/models/posts';
import type { IPostRepository } from './i-post-repository';

@injectable()
export class PostRepository implements IPostRepository {
  private readonly apiUrl = 'http://localhost:3000/posts';

  async findPost(id: PostId): Promise<Post> {
    try {
      const response = await fetch(`${this.apiUrl}?id=${id}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch post with id ${id}. Status: ${response.status}`,
        );
      }
      return (await response.json()) as Post;
    } catch (error) {
      console.error('Error in findPost:', error);
      throw error; // エラーを上位に伝播
    }
  }

  async findAllPosts(): Promise<Post[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts. Status: ${response.status}`);
      }
      return (await response.json()) as Post[];
    } catch (error) {
      console.error('Error in findAllPosts:', error);
      throw error;
    }
  }

  async createPost(post: Post): Promise<Message> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error(`Failed to create post. Status: ${response.status}`);
      }
      return { message: 'Post created successfully!' };
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  }
}
