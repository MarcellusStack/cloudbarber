import { init } from "@instantdb/react";

export const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID as string,
  schema,
});
