"use client";

import ErrorMessage from "@/components/ErrorMessage";

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage() {
  return (
    <>
      <ErrorMessage
        pageTitle="Página não encontrada"
        content={
          "Ocorreu um erro do qual a nossa aplicação ainda esta tratando. Tente novamente mais tarde "
        }
        contentTitle="404"
      />
    </>
  );
}
