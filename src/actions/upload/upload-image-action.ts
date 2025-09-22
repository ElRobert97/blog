"use server";

import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type UploadImageActionResult = {
  url: string;
  error: string;
};
const uploadMaxSize =
  Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_IMAGE_SIZE) || 921600;

export async function uploadImageAction(
  formData: FormData
): Promise<UploadImageActionResult> {
  // TODO: Verificar se o usuário está logado

  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  if (file.size > uploadMaxSize) {
    return makeResult({ error: "Arquivo muito grande" });
  }

  if (!file.type.startsWith("image/")) {
    return makeResult({ error: "Imagem inválida" });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadDir = process.env.NEXT_PUBLIC_MAX_UPLOAD_IMAGE_SIZE || "uploads";
  const uploadFullPath = resolve(process.cwd(), "public", uploadDir);
  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);
  const imageServerUrl =
    process.env.IMAGE_SERVER_URL || "http://localhost:3000/uploads";

  const url = `${imageServerUrl}/${uniqueImageName}`;

  return makeResult({ url });
}
