import type { Context } from 'hono';
import { inject, injectable } from 'inversify';
import type {
  CreatePostUseCase,
  CreatePostUseCaseInput,
} from '../../application/usecases/post/CreatePostUseCase';
import type { GetAllPostsUseCase } from '../../application/usecases/post/GetAllPostsUseCase';
import type { GetPostUseCase } from '../../application/usecases/post/GetPostUseCase';
import { type Post, createPostId } from '../../domain/models/Post';
import { TYPES } from '../../keys';
import type { BaseController } from './base.controller';

@injectable()
export class PostController implements BaseController {
  constructor(
    @inject(TYPES.CreatePostUseCase) private createPostUseCase: CreatePostUseCase,
    @inject(TYPES.GetAllPostsUseCase) private getAllPostsUseCase: GetAllPostsUseCase,
    @inject(TYPES.GetPostUseCase) private getPostUseCase: GetPostUseCase,
  ) {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async main(c: Context): Promise<any> {
    // ルーティングごとに処理を振り分け
    switch (c.req.path) {
      case '/posts':
        if (c.req.method === 'GET') {
          return this.getAllPosts(c);
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else if (c.req.method === 'POST') {
          return this.createPost(c);
        }
        break;
      case `/posts/${c.req.param('id')}`:
        if (c.req.method === 'GET') {
          return this.getPost(c);
        }
        break;
    }
    return c.text('Not Found.', 404);
  }

  private async getPost(c: Context) {
    const id = Number.parseInt(c.req.param('id'));
    const postId = createPostId(id);
    const post = await this.getPostUseCase.execute(postId);
    return c.json(post);
  }

  private async getAllPosts(c: Context) {
    const posts = await this.getAllPostsUseCase.execute();
    return c.json(posts);
  }

  private async createPost(c: Context) {
    const request = await c.req.json<Omit<Post, 'id' | 'userId'>>();
    const input: CreatePostUseCaseInput = {
      title: request.title,
      body: request.body,
    };
    const message = await this.createPostUseCase.execute(input);
    return c.json(message);
  }
}
