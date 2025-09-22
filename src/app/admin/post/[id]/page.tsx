import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { makePublicPostFromDB } from "@/dto/post/dto";
import { findPostByIdAdminCached } from "@/lib/post/queries/admin";
import { notFound } from "next/navigation";

type AdminPostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;

  const post = await findPostByIdAdminCached(id);

  if (!post) notFound();

  const publicPost = makePublicPostFromDB(post);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar Post</h1>
      <ManagePostForm mode="update" publicPost={publicPost} />
    </div>
  );
}
