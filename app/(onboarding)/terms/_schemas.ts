import { z } from "zod";

export const termsSchema = z.object({
  dataPolicy: z.boolean().refine((value) => value === true, {
    message: "Bitte akzeptieren Sie die Datenschutzrichtlinien",
  }),
});
