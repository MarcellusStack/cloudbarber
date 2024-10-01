import { z } from "zod";

export const termsSchema = z.object({
  dataPolicy: z
    .boolean()
    .refine(
      (value) => value === true,
      "Sie müssen die Datenschutzrichtlinie akzeptieren."
    ),
});
