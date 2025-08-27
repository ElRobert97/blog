import ErrorMessage from "@/components/ErrorMessage";
import clsx from "clsx";

export default function NotFoundPage() {
  return (
    <>
      <ErrorMessage
        pageTitle="Página não encontrada"
        content="Error 404 - A página que você está tentando acessar não existe neste
            site."
        contentTitle="404"
      />
    </>
  );
}
