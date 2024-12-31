import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Post, PostCreate, PostId } from './post';
import { IPostRepository } from './postRepository';
import { TYPES } from './types';

export interface IPostService {
  getPost(id: PostId): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  createPost(post: PostCreate): Promise<Post>;
  search(keyword: string, posts: Post[]): Post[] | null;
}

@injectable()
export class PostService implements IPostService {
  constructor(@inject(TYPES.PostRepository) private postRepository: IPostRepository) {}

  getPost(id: PostId): Promise<Post> {
    return this.postRepository.findPost(id);
  }

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.findAllPosts();
  }

  createPost(post: PostCreate): Promise<Post> {
    return this.postRepository.createPost(post);
  }

  search(keyword: string, posts: Post[]): Post[] | null {
    const searchResult = posts.filter((post) => {
      return post.title.includes(keyword) || post.body.includes(keyword);
    });
    if (searchResult.length === 0) {
      return null;
    }
    return searchResult;
  }
}
