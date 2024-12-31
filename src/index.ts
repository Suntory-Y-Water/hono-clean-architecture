import { type Context, Hono } from 'hono';
import type { IPostUsecase } from './application/usecases/PostUsecase';
import { PostController } from './infrastructure/controllers/PostController';
import { injectDependencies } from './infrastructure/middleware/injectDependencies';

type AppType = {
  Variables: {
    postUsecase: IPostUsecase;
  };
};

const app = new Hono<AppType>();

app.use('*', injectDependencies);

function createPostController(c: Context) {
  const postUsecase = c.get('postUsecase');
  return new PostController(postUsecase);
}

// ルーティング定義
app.get('/posts/:id', (c) => {
  return createPostController(c).getPost(c);
});

app.get('/posts', (c) => {
  return createPostController(c).getAllPosts(c);
});

app.post('/posts', (c) => {
  return createPostController(c).createPost(c);
});

export default app;
