import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";

export async function PostsLists() {
  const posts = await findAllPublicPostsCached();
  if (posts.length <= 1) return null;
  return (
    <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2">
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostCoverImage
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: `${post.title}`,
              }}
            />

            <PostSummary
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              postHeading="h1"
              title={post.title}
              postLink={postLink}
            />
          </div>
        );
      })}
    </div>
  );
}
