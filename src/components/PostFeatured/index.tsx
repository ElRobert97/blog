import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import ErrorMessage from "../ErrorMessage";

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle="Ops!"
        content="Ainda não temos nenhum posts publicado"
      />
    );
  const post = posts[0];
  const postLink = `/post/${post.slug}`;

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group lg:grid-cols-3">
      <PostCoverImage
        linkProps={{ href: postLink }}
        imageProps={{
          src: "/images/bryen_0.png",
          width: 1200,
          height: 720,
          alt: "Titulo do post",
          loading: "eager",
          priority: true,
        }}
      />

      <PostSummary
        createdAt="2025-08-15T00:24:38.616Z"
        excerpt={
          "sfnisaudofiudbfiyaufeap anfupnfldiunafiundu n fanfunafuidnaifndiaufn"
        }
        postHeading="h2"
        title={"Um titulo ai"}
        postLink={postLink}
      />
    </section>
  );
}
