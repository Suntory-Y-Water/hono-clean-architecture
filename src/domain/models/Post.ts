export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Message = {
  message: string;
};

const postIdBrand = Symbol();
export type PostId = number & { [postIdBrand]: unknown };

export function createPostId(id: number): PostId {
  return id as PostId;
}
