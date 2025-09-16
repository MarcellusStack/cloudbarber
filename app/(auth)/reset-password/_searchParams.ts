import { createLoader, parseAsString } from "nuqs/server";

export const resetPasswordParams = {
  token: parseAsString.withDefault(""),
};
export const loadResetPasswordParams = createLoader(resetPasswordParams);
