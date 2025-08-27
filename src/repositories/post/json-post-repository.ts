import { PostModel } from "@/models/post-model";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { TIME } from "@/lib/constants";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
);

export class JsonPostRepository implements PostRepository {
  private async simulateAwait() {
    if (TIME <= 0) return;

    await new Promise((resolve) => setTimeout(resolve, TIME));
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateAwait();
    const posts = await this.readFromDisk();
    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await this.simulateAwait();
    const posts = await this.readFromDisk();
    const postsFiltered: PostModel[] = posts.filter(
      (post: PostModel) => post.published
    );
    return postsFiltered;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.id === id);

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.slug === slug);

    if (!post) throw new Error("Post não encontrado");

    return post;
  }
  private async readFromDisk() {
    const jsonContet = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const { posts } = JSON.parse(jsonContet);
    return posts;
  }
}
