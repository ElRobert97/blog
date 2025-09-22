import { PostModel } from "@/models/post-model";

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
  findBySlugPublic(slug: string): Promise<PostModel>;

  // Mutation
  create(post: PostModel): Promise<PostModel>;
}
