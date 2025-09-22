"use client";

import { InputCheckBox } from "@/components/InputCheckBox";
import { InputCustom } from "@/components/Input";
import { MarkdownEditor } from "@/components/MarkDownEditor";
import { useActionState, useEffect, useState } from "react";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/post/create-post-action";
import { ImageUploader } from "../ImageUploader";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";
import { updatePostAction } from "@/actions/post/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";

type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost: PublicPost;
};

type ManagePostFormCreateProps = {
  mode: "create";
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();

  const created = searchParams.get("created");
  const router = useRouter();
  let publicPost;

  if (mode === "update") {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Post atualizado com sucesso!");
    }
  }, [state]);

  useEffect(() => {
    if (created === "1") {
      toast.dismiss();
      toast.success("Post criado com sucesso!");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || "");

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputCustom
          labelText="ID"
          name="id"
          placeholder="ID gerado automaticamente"
          type="text"
          disabled={isPending}
          defaultValue={formState.id}
          readOnly
        />

        <InputCustom
          labelText="Slug"
          name="slug"
          placeholder="Slug gerada automaticamente"
          type="text"
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />

        <InputCustom
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          disabled={isPending}
          defaultValue={formState.author}
        />

        <InputCustom
          labelText="Título"
          name="title"
          placeholder="Digite o título"
          type="text"
          disabled={isPending}
          defaultValue={formState.title}
        />

        <InputCustom
          labelText="Excerto"
          name="excerpt"
          placeholder="Digite o resumo"
          type="text"
          disabled={isPending}
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputCustom
          labelText="URL da imagem de capa"
          name="coverImageUrl"
          placeholder="Digite a url da imagem"
          type="text"
          disabled={isPending}
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckBox
          labelText="Publicar?"
          name="published"
          type="checkbox"
          disabled={isPending}
          defaultChecked={formState.published}
        />

        <div className="mt-4">
          <Button disabled={isPending} type="submit">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
