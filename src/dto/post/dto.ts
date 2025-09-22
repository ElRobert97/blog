import { PostModel } from "@/models/post-model";

export type PublicPost = Omit<PostModel, "updateAt">;

export const makePartialPublicPost = (post?: Partial<PostModel>) => {
  return {
    id: post?.id || "",
    slug: post?.slug || "",
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    author: post?.author || "",
    content: post?.content || "",
    coverImageUrl: post?.coverImageUrl || "",
    published: post?.published || false,
  };
};

export const makePublicPostFromDB = (post: PostModel) => {
  return makePartialPublicPost(post);
};
