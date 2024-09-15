import { Gender } from "@prisma/client";
import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]]),
  birthDate: z.date(),
});
