import { createPostId } from '../domain/models/posts';
import type { IPostRepository } from '../infrastructure/repositories/i-post-repository';
import { REPOSITORY_BINDINGS } from '../keys';
import { mockDiContainer } from '../mocks/container';

describe('PostRepository', () => {
  let postRepository: IPostRepository;

  beforeEach(() => {
    postRepository = mockDiContainer.get<IPostRepository>(
      REPOSITORY_BINDINGS.PostRepository,
    );
  });

  it('should find a post by id', async () => {
    const postId = createPostId(1);
    const post = await postRepository.findPost(postId);
    expect(post).toEqual({
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Content of Post 1',
    });
  });

  it('should return all posts', async () => {
    const posts = await postRepository.findAllPosts();
    expect(posts).toHaveLength(2);
    expect(posts).toEqual([
      { id: 1, userId: 1, title: 'Post 1', body: 'Content of Post 1' },
      { id: 2, userId: 2, title: 'Post 2', body: 'Content of Post 2' },
    ]);
  });

  it('should create a new post', async () => {
    const newPost = {
      id: 123,
      userId: 3,
      title: 'Post 3',
      body: 'Content of Post 3',
    };
    const createdPost = await postRepository.createPost(newPost);
    expect(createdPost).toEqual({
      message: 'Post created successfully!',
    });

    const posts = await postRepository.findAllPosts();
    expect(posts).toHaveLength(3);
  });

  it('should throw an error if post not found', async () => {
    const postId = createPostId(999);
    await expect(postRepository.findPost(postId)).rejects.toThrow('Post not found');
  });
});
