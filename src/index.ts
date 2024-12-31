import { Hono } from 'hono';
import type { container } from './container';
import { injectDependencies } from './middleware/injectDependencies';
import { type Post, createPostId } from './post';
import type { IPostService } from './postService';

const app = new Hono<{
  Variables: {
    container: typeof container;
    postService: IPostService;
  };
}>();

app.use('*', injectDependencies);

app.get('/posts/:id', async (c) => {
  const id = Number.parseInt(c.req.param('id'));
  const postId = createPostId(id);
  const postService = c.get('postService');
  const post = await postService.getPost(postId);
  return c.json(post);
});

app.get('/posts', async (c) => {
  const postService = c.get('postService');
  const post = await postService.getAllPosts();

  return c.json(post);
});

app.post('/posts', async (c) => {
  const request = await c.req.json<Post>();
  const postService = c.get('postService');
  const message = await postService.createPost(request);
  return c.json(message);
});

export default app;
