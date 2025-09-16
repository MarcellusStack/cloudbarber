import { SearchParams } from "nuqs/server";
import { ResetPasswordForm } from "../_components/reset-password-form";
import { loadResetPasswordParams } from "./_searchParams";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const paramsPromise = loadResetPasswordParams(searchParams);
  return (
    <Suspense>
      <ResetPasswordForm paramsPromise={paramsPromise} />
    </Suspense>
  );
}
