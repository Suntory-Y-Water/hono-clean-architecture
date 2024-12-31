import { IPostService, PostService } from '../postService';
import { createPostId, PostCreate } from '../post';
import { IPostRepository } from '../postRepository';
import { TYPES } from '../types';
import { mockDiContainer } from '../mocks/mockDiConfig';

describe('PostService', () => {
  let postService: IPostService;
  let mockPostRepository: IPostRepository;

  beforeEach(() => {
    mockPostRepository = mockDiContainer.get<IPostRepository>(TYPES.PostRepository);
    postService = new PostService(mockPostRepository);
  });

  test('should get a post by id', async () => {
    const postId = createPostId(1);
    const post = await postService.getPost(postId);
    expect(post).toEqual({
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Content of Post 1',
    });
  });

  test('should return all posts', async () => {
    const posts = await postService.getAllPosts();
    expect(posts).toHaveLength(2);
    expect(posts).toEqual([
      { id: 1, userId: 1, title: 'Post 1', body: 'Content of Post 1' },
      { id: 2, userId: 2, title: 'Post 2', body: 'Content of Post 2' },
    ]);
  });

  test('should create a new post', async () => {
    const newPost: PostCreate = { userId: 3, title: 'Post 3', body: 'Content of Post 3' };
    const createdPost = await postService.createPost(newPost);
    expect(createdPost).toEqual({
      id: 3,
      userId: 3,
      title: 'Post 3',
      body: 'Content of Post 3',
    });

    const posts = await postService.getAllPosts();
    expect(posts).toHaveLength(3);
  });

  test('should search posts by keyword', async () => {
    const posts = await postService.getAllPosts();
    const searchResult = postService.search('Post 1', posts);
    expect(searchResult).toHaveLength(1);
    expect(searchResult![0]).toEqual({
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Content of Post 1',
    });
  });

  test('should return null if no posts match the keyword', async () => {
    const posts = await postService.getAllPosts();
    const searchResult = postService.search('Nonexistent', posts);
    expect(searchResult).toBeNull();
  });
});
