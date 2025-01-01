import type { Context } from 'hono';
import { inject, injectable } from 'inversify';
import type { GetAllPostsUseCase } from '../../application/usecases/post/get-all-posts.usecase';
import { USECASE_BINDINGS } from '../../keys';
import type { BaseController } from './base.controller';

@injectable()
export class GetAllPostsController implements BaseController {
  constructor(
    @inject(USECASE_BINDINGS.GetAllPostsUseCase) private usecase: GetAllPostsUseCase,
  ) {}

  async main(c: Context) {
    return this.mainFn(c);
  }

  private async mainFn(c: Context) {
    const posts = await this.usecase.execute();
    return c.json(posts);
  }
}
