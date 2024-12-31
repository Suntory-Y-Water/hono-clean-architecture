import { Hono } from 'hono';
import type { container } from './container';
import { injectDependencies } from './middleware/injectDependencies';
import { type PostCreate, createPostId } from './post';
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
  const request = await c.req.json<PostCreate>();
  const postService = c.get('postService');
  const post = await postService.createPost(request);
  return c.json(post);
});

app.get('/search', async (c) => {
  const postService = c.get('postService');
  const post = await postService.getAllPosts();
  const query = c.req.query('keyword');
  if (!query) {
    console.error('No keyword query');
    return c.json(post);
  }
  const searchResult = postService.search(query, post);

  if (!searchResult) {
    return c.json({ message: 'No search result' });
  }
  return c.json(searchResult);
});

export default app;
