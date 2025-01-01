import type { Context } from 'hono';
import { inject, injectable } from 'inversify';
import type { GetPostUseCase } from '../../application/usecases/post/get-posts.usecase';
import { createPostId } from '../../domain/models/Post';
import { USECASE_BINDINGS } from '../../keys';
import type { BaseController } from './base.controller';

@injectable()
export class GetPostController implements BaseController {
  constructor(
    @inject(USECASE_BINDINGS.GetPostUseCase) private usecase: GetPostUseCase,
  ) {}

  async main(c: Context) {
    return this.mainFn(c);
  }

  private async mainFn(c: Context) {
    const id = Number.parseInt(c.req.param('id'));
    const postId = createPostId(id);
    const posts = await this.usecase.execute(postId);
    return c.json(posts);
  }
}
