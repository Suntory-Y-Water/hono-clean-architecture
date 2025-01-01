import type { Message, Post, PostId } from '../../domain/models/Post';

export interface IPostRepository {
  findPost(id: PostId): Promise<Post>;
  findAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<Message>;
}
