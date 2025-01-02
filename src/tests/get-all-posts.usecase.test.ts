import { GetAllPostsUseCase } from '../application/usecases/post/get-all-posts.usecase';
import { REPOSITORY_BINDINGS } from '../keys';
import { mockDiContainer } from '../mocks/container';
import type { IPostRepository } from '../mocks/mock-post-repository';

describe('GetAllPostsUseCase', () => {
  let useCase: GetAllPostsUseCase;
  let mockRepository: IPostRepository;

  beforeEach(() => {
    mockRepository = mockDiContainer.get<IPostRepository>(
      REPOSITORY_BINDINGS.PostRepository,
    );
    useCase = new GetAllPostsUseCase(mockRepository);
    vi.clearAllMocks();
  });

  it('全ての投稿が取得できること', async () => {
    const mockPosts = [
      { id: 1, userId: 1, title: 'Post 1', body: 'Content of Post 1' },
      { id: 2, userId: 2, title: 'Post 2', body: 'Content of Post 2' },
    ];
    vi.spyOn(mockRepository, 'findAllPosts').mockResolvedValue(mockPosts);
    const result = await useCase.execute();
    expect(result).toEqual({ posts: mockPosts });
  });
});
