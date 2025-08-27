import { formatDatetime } from "@/utils/format-datetime";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { PostHeading } from "../PostHeading";
import { PostModel } from "@/models/post-model";
import { PostDate } from "../PostDate";

type PostSummaryProps = {
  postHeading: "h1" | "h2";
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};

export async function PostSummary({
  postLink,
  postHeading,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <PostDate datetime={createdAt} />
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
