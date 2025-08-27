import { PostsLists } from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";
import { PostFeatured } from "@/components/PostFeatured";

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className="min-h-10 mb-16" />}>
        <PostFeatured />
        <PostsLists />
      </Suspense>
    </>
  );
}
