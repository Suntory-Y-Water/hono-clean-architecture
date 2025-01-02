import { GetPostUseCase } from '../application/usecases/post/get-posts.usecase';
import { createPostId } from '../domain/models/posts';
import { REPOSITORY_BINDINGS } from '../keys';
import { mockDiContainer } from '../mocks/container';
import type { IPostRepository } from '../mocks/mock-post-repository';

describe('GetPostUseCase', () => {
  let useCase: GetPostUseCase;
  let mockRepository: IPostRepository;

  beforeEach(() => {
    mockRepository = mockDiContainer.get<IPostRepository>(
      REPOSITORY_BINDINGS.PostRepository,
    );
    useCase = new GetPostUseCase(mockRepository);
    vi.clearAllMocks();
  });

  it('指定されたIDの投稿が取得できること', async () => {
    const mockPost = {
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Content of Post 1',
    };

    // findPostメソッドのモックを実装
    vi.spyOn(mockRepository, 'findPost').mockResolvedValue(mockPost);
    const postId = createPostId(1);
    const result = await useCase.execute(postId);
    expect(result).toEqual({ posts: mockPost });
  });

  it('指定されたIDの投稿が存在しない場合、エラーが返されること', async () => {
    // findPostメソッドのモックを実装
    vi.spyOn(mockRepository, 'findPost').mockRejectedValue(
      new Error('Post not found'),
    );
    const postId = createPostId(999);
    await expect(useCase.execute(postId)).rejects.toThrow('Post not found');
  });
});
