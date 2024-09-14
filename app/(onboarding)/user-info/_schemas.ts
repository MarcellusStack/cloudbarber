import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().min(1),
  birthDate: z.date(),
});
