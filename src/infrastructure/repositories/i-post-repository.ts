import type { Message, Post, PostId } from '../../domain/models/posts';

export interface IPostRepository {
  findPost(id: PostId): Promise<Post>;
  findAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<Message>;
}
