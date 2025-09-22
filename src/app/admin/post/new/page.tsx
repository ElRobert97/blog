import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Criar post",
};

export default async function AdminPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Criar Posts</h1>
      <ManagePostForm mode="create" />
    </div>
  );
}
