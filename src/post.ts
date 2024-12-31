export type PostCreate = {
  userId: number;
  title: string;
  body: string;
};

export type Post = PostCreate & {
  id: number;
};

// post.ts
const postIdBrand = Symbol();

export type PostId = number & { [postIdBrand]: unknown };

export function createPostId(id: number): PostId {
  return id as PostId;
}
