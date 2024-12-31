import { injectable } from 'inversify';
import 'reflect-metadata';
import type { Message, Post, PostId } from './post';

export interface IPostRepository {
  findPost(id: PostId): Promise<Post>;
  findAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<Message>;
}

@injectable()
export class PostRepository implements IPostRepository {
  private readonly apiUrl = 'http://localhost:3000/posts';

  async findPost(id: PostId): Promise<Post> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post with id ${id}`);
    }
    const data = (await response.json()) as Post;
    return data;
  }

  async findAllPosts(): Promise<Post[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    const data = (await response.json()) as Post[];
    return data;
  }

  async createPost(post: Post): Promise<Message> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...post }),
    });
    if (!response.ok) {
      console.error(response);
      throw new Error('Failed to create post Error!');
    }

    return { message: 'Post created successfully!' };
  }
}
